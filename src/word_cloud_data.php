<script type="text/javascript">
    var DATA = [];
<?php
for ($i = 1000; $i <= 1005; $i++) {
    ?>
        DATA.push(
                {
                    "name": '<?php echo rand(1, 9999999999) ?>',
                    "group": <?php echo rand(1, 3) ?>,
                    "size": <?php echo rand(10, 100) ?>,
                }
        );
    <?php
}
?>
    create_word_cloud(DATA);
</script>
