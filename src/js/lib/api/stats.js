const url = `http://localhost/PhaserSetup/src/`;
const $form = document.querySelector(`form`);

export default {
  select: () => {
    return fetch(url, {
      headers: new Headers({
        Accept: `application/json`,
      }),
    }).then(r => r.json());
  },
  insert: () => {
    return fetch(url, {
      headers: new Headers({
        Accept: `application/json`,
      }),
      method: `post`,
      body: new FormData($form),
    })
      .then(r => r.json()
        .then(data => {
          if(data.result === `ok`){
            //
          }else{
            if(data.errors.text){
              //
            }
          }
        }));
  },
};
