<?php

if (isset($_POST['url']) && $_POST['url'] == '') {
  $request = array_merge([
    'poll' => null,
    'name' => null,
    'contact' => null,
    'type' => null,
  ], $_POST);

  $type = $request['type'];
  $poll = $request['poll'];

  $errors = [];

  $name = trim($request['name']);
  if (!$name) {
    $errors['name'] = 'Is empty';
  } elseif (!is_string($name)) {
    $errors['name'] = 'Invalid type';
  }

  $contact = trim($request['contact']);
  if (!$contact) {
    $errors['contact'] = 'Is empty';
  } elseif (!is_string($contact)) {
    $errors['contact'] = 'Invalid type';
  }

  $requestMessage = '
    <p>The customer left the request for the consultation on the our landing page. The request details below.</p>
    <table style="border: none;">
      <tr>
          <td style="font-weight: bold; vertical-align: top;">Name: </td>
          <td style="vertical-align: top;">' . $name . '</td>
      </tr>
      <tr>
          <td style="font-weight: bold; vertical-align: top;">Contact: </td>
          <td style="vertical-align: top;">' . $contact . '</td>
      </tr>
      <tr>
          <td style="font-weight: bold; vertical-align: top;">Web site type: </td>
          <td style="vertical-align: top;">' . ($type ? $type['label'] . ' (' . $type['tag'] . ')' : 'not filled') . '</td>
      </tr>
    </table>';

  if ($poll && is_array($poll)) {
    $pollRows = [];
    foreach ($poll as $item) {
      if (is_array($item) && isset($item['question']) && isset($item['answer'])) {
        $pollRows[] = '
          <tr>
            <td style="vertical-align: top; text-align: left;">' . $item['question'] . '</td>
            <td style="vertical-align: top; text-align: left;">' . $item['answer'] . '</td>
          </tr>';
      }
    }

    $pollMessage = '
        <p>Survey responses below.</p>
        <table style="border: none;">' . implode('', $pollRows) . '</table>';
  } else {
    $pollMessage = '<p>The user is not a poll</p>';
  }

  if (!$errors) {
    $subject = '[webulla]->[web] Consultation request';
    $body = '
    <html>
      <head>
        <title>Consultation request</title>
      </head>
      <body>
        ' . $requestMessage . '
        <br>' . $pollMessage . '
      </body>
    </html>';

    // you can set your own settings
    $mailTo = 'target@mail.com';
    $mailHost = 'smtp host';
    $mailUsername = 'user@mail.ru';
    $mailPassword = 'password';

    require '../../vendor/autoload.php';

    $mail = new PHPMailer();
    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';

    $mail->Host = $mailHost;
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;
    $mail->Port = 25;
    $mail->Username = $mailUsername;
    $mail->Password = $mailPassword;

    $mail->setFrom($mailUsername, 'Droid');
    $mail->addAddress($mailTo, 'Gate');

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $body;

    if ($mail->send()) {
      http_response_code(200);
      $response = true;
    } else {
      http_response_code(500);
      $response = $mail->ErrorInfo;
    }
  } else {
    http_response_code(400);
    $response = $errors;
  }
} else {
  http_response_code(200);
  $response = true;
}

header('Content-Type: application/json');
echo json_encode($response);
