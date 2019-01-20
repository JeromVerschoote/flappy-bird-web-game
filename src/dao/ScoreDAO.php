<?php

require_once( __DIR__ . '/DAO.php');

class ScoreDAO extends DAO {

  public function selectAll(){
    $sql = "SELECT * FROM `cod_scores` /*WHERE date BETWEEN '2017-03-15 00:00:00' AND  '2017-03-15 09:00:00'*/ ORDER BY `cod_scores`.`score` DESC LIMIT 5";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id){
    $sql = "SELECT * FROM `cod_scores` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function delete($id){
    $sql = "DELETE FROM `cod_scores` WHERE `id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    return $stmt->execute();
  }

  public function insert($data) {
    $errors = $this->validate($data);
    if (empty($errors)) {
      $sql = "INSERT INTO `cod_scores` (`user`, `date`, `score`) VALUES (:user, :date, :score)";
      $stmt = $this->pdo->prepare($sql);
      $stmt->bindValue(':user', $data['user']);
      $stmt->bindValue(':date', $data['date']);
      $stmt->bindValue(':score', $data['score']);
      if ($stmt->execute()) {
        return $this->selectById($this->pdo->lastInsertId());
      }
    }
    return false;
  }

  public function validate( $data ){
    $errors = [];
    if (!isset($data['user'])) {
      $errors['user'] = 'Gelieve user in te vullen';
    }
    if (!isset($data['score'])) {
      $errors['score'] = 'Gelieve score in te vullen';
    }
    return $errors;
  }
}
