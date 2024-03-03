<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscription</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>

<body>
    <div class="container mt-5">
        <h1 class="mb-4">Inscription</h1>
    <form action="biienvenue.php" method="post" enctype="multipart/form-data">
    <div class="form-group">
    <label for="pseudo">Pseudo :</label>
    <input type="text" class="form-control" name="pseudo" placeholder="Saisir votre pseudo" required>
</div>

<div class="form-group">
    <label for="email">Email :</label>
    <input type="email" class="form-control" name="email" placeholder="Saisir votre E-mail" required>
</div>

<div class="form-group">
    <label for="annee_naissance">Année de naissance :</label>
    <input type="text" class="form-control" name="annee_naissance" id="annee_naissance" placeholder="Saisir votre année de naissance" min="1900" max="<?php echo date('Y'); ?>" required>
</div>


<div class="form-group">
    <label for="bio">Bio :</label>
    <textarea class="form-control" name="bio" placeholder="Saisir votre bio" required></textarea>
</div>

<div class="form-group">
    <label for="profile_image">Image de profil :</label>
    <input type="file" class="form-control-file" name="profile_image" accept="image/*" required>
</div>


    <div class="form-group">
        <input type="submit" value="S'inscrire">
    </div>
    </form>
    <script>
        $(function() {
            $("#annee_naissance").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: "1900:<?php echo date('Y'); ?>",
                dateFormat: 'dd-mm-yy'
            });
        });
    </script>
</body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $pseudo = $_POST["pseudo"];
    $email = $_POST["email"];
    $anneeNaissance = $_POST["annee_naissance"];
    $bio = $_POST["bio"];

    $anneeActuelle = date("Y");
    $age = $anneeActuelle - $anneeNaissance;
    if($age < 18) {
        echo "<p>Vous devez avoir plus de 18 ans pour vous inscrire.</p>";
    } else {
        header("Location: bienvenue.php?pseudo=" . urlencode($pseudo));
    }
    
    // Gestion du téléchargement de fichiers
    $targetDir = "uploads/";
    if(!isset($_FILES["profile_image"])) {
        echo "Problem";
        return;
    }
    $targetFile = $targetDir . basename($_FILES["profile_image"]["name"]);
    $uploadOk = 1;
    $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Vérifier si le fichier image est une image réelle ou une fausse image
    $check = getimagesize($_FILES["profile_image"]["tmp_name"]);
    if ($check !== false) {
        echo "Le fichier est une image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "Le fichier n'est pas une image.";
        $uploadOk = 0;
    }

    // Vérifier la taille du fichier
    if ($_FILES["profile_image"]["size"] > 500000) {
        echo "Désolé, votre fichier est trop grand.";
        $uploadOk = 0;
    }

    // Autoriser certains formats de fichiers
    if (
        $imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif"
    ) {
        echo "Désolé, seuls les fichiers JPG, JPEG, PNG et GIF sont autorisés.";
        $uploadOk = 0;
    }

    // Vérifier si $uploadOk est mis à 0 par une erreur
    if ($uploadOk == 0) {
        echo "Désolé, votre fichier n'a pas été chargé.";
        // si tout est correct, essayez de télécharger le fichier
    } else {
        echo "hello";
        return;
        if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $targetFile)) {
            echo "Le fichier " . htmlspecialchars(basename($_FILES["profile_image"]["name"])) . " a été chargé.";
        } else {
            echo "Désolé, il y a eu une erreur lors du téléchargement de votre fichier.";
        }
    }
}
?>




</html>