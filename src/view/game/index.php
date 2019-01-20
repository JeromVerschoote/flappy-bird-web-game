<section class="game">
  <div id="content"></div>
</section>
  <?php if( isset( $error ) ): ?>
  <div class="error">
    <ul>
      <?php foreach( $error as $message ): ?>
        <li><?php echo $message; ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>

<section class="form-section">
  <form class="score-form " method="post" action="index.php">
    <input type="hidden" name="action" value="insertScore" />
    <input type="hidden" name="score" value="" id="score"/>
    <input  id="user" class="input-field" type="text" name="user" value="<?php
        if (!empty($_POST['user'])) {
          echo $_POST['user'];
        }
        ?>" placeholder="username"/>
    <button class="submit-button" type="submit">Add score</button>
    <span class="error error--text"><?php if (!empty($errors['text'])) echo $errors['text'];?></span>
  </form>
</section>

  <section class="score-table hidden">
  <table>
    <thead>
      <tr>
        <td><span>Username</span></td>
        <td><span>Score</span></td>
        <td><span>Date</span></td>
      </tr>
    </thead>
    <tbody></tbody>
  </table>
</section>
</section>

<script type="text/javascript">
{
  const init = () => {
    const confirmationLinks = Array.from(document.getElementsByClassName(`confirmation`));
    confirmationLinks.forEach($confirmationLink => {
      $confirmationLink.addEventListener(`click`, e => {
        if (!confirm('Are you sure?')) e.preventDefault();
      });
    });
  };
  init();
}
</script>
