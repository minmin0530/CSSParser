<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body>
    <?php
      mb_language("Japanese");
      mb_internal_encoding("UTF-8");
      $content = $_POST['content'];
      $content = str_replace('<br>', '
', $content);
      $content = str_replace('<div>', '
', $content);

      $begin = 0;
      while (true) {
        $begin = strpos($content, '<', $begin);
        if ($begin === false) { break; }
        $end = strpos($content, '>', $begin) + 1;
        $token = substr($content, $begin, $end - $begin);
        $content = str_replace($token, '', $content);
      }

      file_put_contents('style2.css', $content);

    ?>
  </body>
</html>