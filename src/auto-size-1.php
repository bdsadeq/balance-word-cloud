<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="./css/bootstrap.min.css">
        <link rel="stylesheet" href="./css/custom.css">


        <title>Balance Word Cloud</title>
    </head>
    <body>
        <div class="container top-wrapper">
            <div class="col-sm-6 offset-sm-3" id="cloud-container">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Word Cloud</h5>
                        <p class="card-text" id="word-cloud"></p>
                    </div>
                </div>
            </div>
        </div>

        <script src="./js/jquery-3.3.1.js"></script>
        <script src="./js/bootstrap.min.js"></script>
        <script src="./js/d3.min.js"></script>
        <script src="./js/d3.layout.cloud.min.js"></script>
        <script src="./js/auto-size-1.js"></script>

        <?php require 'word_cloud_data.php'; ?>
    </body>
</html>
