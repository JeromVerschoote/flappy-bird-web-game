import Game from './classes/Game';

{
  const $table = document.querySelector(`tbody`);
  const $form = document.querySelector(`form`);
  const $inputUser = document.getElementById(`user`);

  const init = () => {
    if($table){
      loadScores();
    }
    if ($form) {
      $form.addEventListener(`submit`, handleSubmitScore);
    }
    new Game();
  };

  const loadScores = () => {
    fetch(`index.php`, {
      headers: new Headers({
        Accept: `application/json`,
      }),
    })
      .then(r => r.json())
      .then(data => handleLoadScores(data));
  };

  const handleLoadScores = data => {
    $table.innerHTML = data
      .map(score => createScoreListItem(score))
      .join(``);
  };

  const createScoreListItem = item => {
    return `<tr>
      <td><span>${item.user}</span></td>
      <td><span>${item.score}</span></td>
      <td><span>${item.date}</span></td>
    </tr>`;
  };

  const handleSubmitScore = e => {
    e.preventDefault();
    fetch($form.getAttribute(`action`), {
      headers: new Headers({
        Accept: `application/json`,
      }),
      method: `post`,
      body: new FormData($form),
    })
      .then(r => r.json())
      .then(data => handleLoadSubmit(data));
  };

  const handleLoadSubmit = data => {
    const $errorText = document.querySelector(`.error--text`);
    $errorText.textContent = ``;
    if (data.result === `ok`) {
      $inputUser.value = ``;
      loadScores();
    } else {
      if (data.errors.text) {
        $errorText.textContent = data.errors.text;
      }
    }
  };

  init();
}
