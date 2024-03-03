<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue</title>
    <style>
        .profile-box {
            border: 2px solid #ccc;
            padding: 20px;
            margin: 20px;
            border-radius: 10px;
        }

        .profile-image {
            max-width: 200px;
            height: auto;
        }
    </style>
</head>

<body>
    <?php
    $pseudo = isset($_GET["pseudo"]) ? htmlspecialchars($_GET["pseudo"]) : "Utilisateur";
    $profile_image = isset($_GET["profile_image"]) ? htmlspecialchars($_GET["profile_image"]) : "default.jpg"; // Change "default.jpg" to the default image filename

    echo "<div class='profile-box'>";
    echo "<h1>Bienvenue, $pseudo!</h1>";
    echo "<p>Voici votre photo de profil :</p>";
    echo "<img src='uploads/$profile_image' alt='Profile Image' class='profile-image'>";
    echo "</div>";
    ?>
</body>

</html>
