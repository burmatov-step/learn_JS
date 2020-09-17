const sentForm = () => {
  const errorMessage = "Что то пошло не так",
    successMesage = "Спасибо! мы скоро с вами свяжемся";
  let loadMessage = document.createElement("div");
  loadMessage.id = "cube-loader";
  loadMessage.innerHTML = `
    <div class="caption">
      <div class="cube-loader">
        <div class="cube loader-1"></div>
        <div class="cube loader-2"></div>
        <div class="cube loader-4"></div>
        <div class="cube loader-3"></div>
      </div>
    </div>

    `;
  const form = document.getElementById("form1"),
    form2 = document.getElementById("form2"),
    formAll = document.querySelectorAll('form');
    console.log(formAll);
  const input1 = form.querySelectorAll("input"),
    input2 = form2.querySelectorAll("input");
  const validate = (e) => {
    if (e.target.type === "tel") {
      e.target.value = e.target.value.match(/\+?[0-9]*/);
    } else if (e.target.type !== "email") {
      e.target.value = e.target.value.match(/[а-яА-Я ]*/);
    }
  };


  const statusMessage = document.createElement("div");


  const sentForm = (item, e) =>{
    const input = item.querySelectorAll("input");
     statusMessage.textContent = "";

     e.preventDefault();
     item.appendChild(statusMessage);

     statusMessage.appendChild(loadMessage);
     const formData = new FormData(item);
     let body = {};
     formData.forEach((val, key) => {
       body[key] = val;
     });

     const succs = () => {
       statusMessage.textContent = successMesage;
     };
     const err = () => {
       statusMessage.textContent = errorMessage;
     };

     postData(body)
       .then((response) => {
         if (response.status !== 200) {
           throw new Error("status network not 200");
         }
         succs();
       })
       .catch((error) => {
         console.log(error);
         err();
       });
     input.forEach((e) => {
       e.value = "";
     });
  }

  formAll.forEach((item) => {
      item.addEventListener("input", (e) => {
        validate(e);
      });
      item.addEventListener('submit', (e)=>{
        sentForm(item, e)
      })

  });



  const postData = (body) => {
    return fetch("server.php", {
      method: "POST",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(body),
    });
  };
};

export default sentForm;