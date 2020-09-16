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
    form2 = document.getElementById("form2");
  const input1 = form.querySelectorAll("input"),
    input2 = form2.querySelectorAll("input");
  const validate = (e) => {
    if (e.target.type === "tel") {
      e.target.value = e.target.value.match(/\+?[0-9]*/);
    } else if (e.target.type !== "email") {
      e.target.value = e.target.value.match(/[а-яА-Я ]*/);
    }
  };

  form.addEventListener("input", (e) => {
    validate(e);
  });

  form2.addEventListener("input", (e) => {
    validate(e);
  });

  const statusMessage = document.createElement("div");

  form2.addEventListener("submit", (e) => {
    statusMessage.textContent = "";
    console.log(e);
    e.preventDefault();
    form2.appendChild(statusMessage);

    statusMessage.appendChild(loadMessage);
    const formData = new FormData(form2);
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
    input2.forEach((e) => {
      e.value = "";
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    statusMessage.textContent = "";
    form.appendChild(statusMessage);
    statusMessage.appendChild(loadMessage);
    const formData = new FormData(form);
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

    input1.forEach((e) => {
      e.value = "";
    });
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