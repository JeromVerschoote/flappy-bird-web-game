<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/scoreDAO.php';

class GameController extends Controller {

  private $scoreDAO;

  function __construct() {
    $this->scoreDAO = new ScoreDAO();
  }

  public function index() {;
    if (!empty($_POST['action'])) {
      if ($_POST['action'] == 'insertScore') {
        $this->handleInsertScore();
      }
    }

    $scores = $this->scoreDAO->selectAll();
    $this->set('scores', $scores);
    $this->set('title', 'Game');

    if (strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json') {
      header('Content-Type: application/json');
      echo json_encode($scores);
      exit();
    }
  }

  private function handleInsertScore() {
    $data = array(
      'user' => $_POST['user'],
      'date' => date('Y-m-d H:i:s'),
      'score' => $_POST['score']
    );
    $insertScoreResult = $this->scoreDAO->insert($data);
    if (!$insertScoreResult) {
      $errors = $this->scoreDAO->validate($data);
      $this->set('errors', $errors);
      if (strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json') {
        header('Content-Type: application/json');
        echo json_encode(array(
          'result' => 'error',
          'errors' => $errors
        ));
        exit();
      }
      $_SESSION['error'] = 'De score kon niet toegevoegd worden!';
    } else {
      if (strtolower($_SERVER['HTTP_ACCEPT']) == 'application/json') {
        header('Content-Type: application/json');
        echo json_encode(array(
          'result' => 'ok',
          'score' => $insertScoreResult
        ));
        exit();
      }
      $_SESSION['info'] = 'De score is toegevoegd!';
      header('Location: index.php');
      exit();
    }
  }
}
