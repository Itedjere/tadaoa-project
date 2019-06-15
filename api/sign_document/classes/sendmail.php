<?php
/**
 * @class Sender
 * This is used to send email via react contact from component
 */
class Sender
{
    public $sendTo;
    public $sendFrom;
    public $subject;
    public $message;
    public $headers;
    public $error = [];

    public function __construct($sendTo, $sendFrom = null, $subject, $message)
    {
        $this->sendTo = $sendTo;
        $this->sendFrom = ($sendFrom) ? $sendFrom : 'support@tadaoa.com';
        $this->subject = $subject;
        $this->message = $message;
    }

    public function setTo($email, $name) {
        return $this->sendTo = $email;
    }

    public function getTo() {
        return $this->sendTo;
    }

    public function setFrom($email, $name)  {
        return $this->sendFrom = $email;
    }

    public function getFrom() {
        return $this->sendFrom;
    }

    public function setSubject($subject) {
        return $this->subject = $subject;
    }

    public function getSubject() {
        return $this->subject;
    }

    public function setMessage($message) {
        $this->message = $message;
        return $this;
    }

    public function getMessage() {
        return $this->message;
    }

    public function setHeader() {
        $headers = 'From: '.$this->getFrom() . "\r\n" .
            'Reply-To: '.$this->getFrom() . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        $this->headers = $headers;
        return $this;
    }

    public function send() {
        $to = $this->sendTo;
        $from = $this->sendFrom;
        $subject = $this->subject;
        $message = $this->message;
        //$headers = $this->headers;
        $headers = 'From: <' . $this->getFrom() . '>' . "\r\n"; 
        $headers .= "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(array("sent" => true));
        } else {
            echo json_encode(
                [
                   "sent" => false,
                   "message" => "An Error Occured. Please Try Again Later"
                ]
            ); 
        }
    }
}