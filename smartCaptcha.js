//Скриптовая часть "умной капчи". Версия: 00.1. Автор: Virabyan Aram (t.me/aramtop)

//Передаем стили для красивого вида капчи и ее позиционирования
var smartCaptcha_EmbedStyle = document.createElement('style');
smartCaptcha_EmbedStyle.innerHTML = `

.smartCamptcha_Zipped{
    font-family: "Arial", sans-serif;
}
.smartCaptcha_Element {
    width: 310px;
    display: block;
    flex-direction: column;
    align-items: center;
    color: var(--smartcaptcha_bgColor);
    text-align: center;
    border-radius: 20px;
    padding: 30px 30px 70px;
    background-color: var(--smartcaptcha_bgColor); /* Fallback color */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    top: 15%;
    border: 2px dotted #ed6755;
}
.smartCaptcha_Element button.smartCaptcha_requested_Close {
    display: flex;
    width: 30px;
    font-size: 20px;
    color: var(--smartcaptcha_closeColor);
    align-self: flex-end;
    background-color: transparent;
    border: none;
    margin-bottom: 10px;
}
.smartCaptcha_Element img {
    width: 190px;
    margin-bottom: 15px;
    transition: transform 0.45s ease-in;
    transition: transform 0.45s ease-out;
    z-index: 0;
    pointer-events: none;
    border-radius: 50%;
}
.smartCaptcha_Element p {
    color: var(--smartcaptcha_regularTextColor);
    margin-bottom: 40px;
    font-size: 16px;
}
.smartCaptcha_Element button.smartCaptcha_requested_NextPositive {
    position: relative;
    background-color: var(--smartCaptcha_acceptButtonColor);
    border: none;
    order-radius: 5px;
    width: 200px;
    padding: 14px;
    font-size: 16px;
    color: white;
    box-shadow: 0px 6px 18px -5px var(--smartCaptcha_acceptButtonColor);
    z-index: 2;
}

.smartCaptcha_requested_left{
    position: relative;
    margin-top: 19%;
    width: 18%;
    min-height: 5x;
    background: white;
    float: left;
    border-radius: 14px;
    z-index: 2;
}
.smartCaptcha_requested_right{
    position: relative;
    margin-top: 19%;
    width: 19%;
    min-height: 5px;
    background: white;   
    float: right;
    border-radius: 14px;
    z-index: 2;
}

.turnButton img{
    margin-top: 15px;
    width: 25px;
}
`;
document.head.appendChild(smartCaptcha_EmbedStyle);

//Добавляем в код страницы "каркас" капчи
var smartCaptcha_blueprintModel = document.createElement("div");
smartCaptcha_blueprintModel.id = 'smartcaptcha_Block';
smartCaptcha_blueprintModel.innerHTML = `
    <div class="smartCamptcha_Zipped" style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" unselectable="on" onselectstart="return false;" onmousedown="return false;" id="smartCamptcha_Zipped">
      <div class="smartCaptcha_Element" id="smartCaptcha_Element_Interact">
        <button class="smartCaptcha_requested_Close" id="smartCaptcha_requested_Close">✖</button>
        <p lno="0">Loading..</p>
      </div>
    </div>`;
document.body.appendChild(smartCaptcha_blueprintModel);
smartCaptcha_blueprintModel.style.display = "none";

//Инициализация кода блока капчи (HTML)
var smartCaptcha_PopupElementContent = document.getElementById("smartCamptcha_Zipped");


function smartcaptcha(publickey, theme) {
    //Удаляем уже существующие токены, ввиду новой сессии
    localStorage.removeItem('smartcaptcha_solutionkey');
    var current_rotation = 0;

    smartCaptcha_blueprintModel.style.display = "block";
    switch (theme) {
      case 'light':
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_bgColor', '#FFF');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_closeColor', '#252525');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_regularTextColor', '#252525');
        smartCaptcha_blueprintModel.style.setProperty('--smartCaptcha_acceptButtonColor', '#ed6755');
        console.log('test2');
        break;
      case 'dark':
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_bgColor', '#000');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_closeColor', '#c0c5cb');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_regularTextColor', '#c0c5cb');
        smartCaptcha_blueprintModel.style.setProperty('--smartCaptcha_acceptButtonColor', '#ed6755');
        console.log('test');
        break;
      default:
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_bgColor', '#fff');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_closeColor', '#c0c5cb');
        smartCaptcha_blueprintModel.style.setProperty('--smartcaptcha_regularTextColor', '#c0c5cb');
        smartCaptcha_blueprintModel.style.setProperty('--smartCaptcha_acceptButtonColor', '#ed6755');
        console.log('test-def');
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var sn = this.responseText;
            document.getElementById("smartCaptcha_Element_Interact").innerHTML = `
              <button class="smartCaptcha_requested_Close" id="smartCaptcha_requested_Close">✖</button>
              <p lno="0">Поверните изображение так, чтобы оно было расположено корректно</p>
              <img class="smartCaptcha_imageRotate" align="middle" src="http://test.deqstudio.com/captcha/receive.php?sn=` + sn + `" alt="captchaImageSource" />
              <div class="smartCaptcha_requested_left turnButton" id="smartCaptcha_requested_left"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACeklEQVRoge2ZO3PTQBSFz83QWVYFri39KChoeIQQmYI4iRM6RIfzMhS2QxIeLX/KUh2GxpYHGnwpEsBDtNe6q9Uww+jU+nbP2bu6WklArVq1av3XCoezOBxlr6tiyM5WcSNMeHk1EfUnHe+Fa6ayAMtG/kwmG7Jh1spbLWYEAMD83SUDVFABkxEiOphE3r6GAegw6Xh70nxOK+DWPB+tMg84rIDNKgrb5jh55u8WmddJAHkV/Z6GYeJBGvnbRecuvYVcmifgjcb8NWMvmy1gvk/wdhI1t7QerAMIK3+SdPwdHYOzJPI2QcRaH1YBnJonnCeb3lMb81e4UjY3n7DyF0nkbdiaB4Bbmovdmqf3yWXDeuV/j1L0QqlzTDrNroZhpg/pl8YTxLTQ2b2pQgGcmgd9TC8b6y7MAwWeA3Lb81Tbhog+uTQPrKiATdsTmM/Jbe8+7tIPW7N5EiuwIP6mHdCGKSMxQNrx+wzOe5nYCE+zAZhvVFBg7oVf5xeI2ekJeOVgJkPMeB6OsxMdww/aLbchCg1kNARshaPZQMMQ+GH7zvzcVYjCg0gh2uOpqhJE/Chozc9chFANYDTE1NWGAPhx0Mre5d1HGqlXQAoRjKbHGgbAenBaLoQ12B5N9wmU8/HJfCI1M/bHaes9aF5V2g6G0yMdc92WLVT6nViohPGV0sRIZyuTSncBoRK7wWh6qGGkjmaSk14sh8gONAwxdU1bME/OnohCu+yF46yvYoh2TNX7W07PJcIRYk8dQqjespx/3BVDDGexhgG4Z2J+qZKv0yZDizUY+7wNA1T8g2O5XTIhTqPmqyqYShUOZ/GqbeCCqVWrVq1/o5/Lu/shlKPcLgAAAABJRU5ErkJggg=="/></div>
              <div class="smartCaptcha_requested_right turnButton" id="smartCaptcha_requested_right"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACaElEQVRoge2YO5PTMBSFv8vQEVrq2D+MkiEboA3hmX2RbMmC7dT8sCU1JfJCt5fCCcvEju0rywvM+LTKGX1HupJuDIMGDRr0zytO3CJO81XfHh9JGxAV3hc/louro9HLPjy+qg3wJ8itoR7Ix9NF92pHpRxQ0Zm1NHw8bdVYQlHiThDelo2HVzVO3bHCO4vHV40BAKLUnQJvLEB3FaJVAIAodefAKwuQz+5Z1ToAwDjNPwg6twD57J5FpgAA4yRfimhp4r8VwhwAIE7zlaIzC1CUuTOU1xZPG3kFQFWiLP8IPLcA+ZyjJvkFgCJEml8iPLMAhQ7hHwB2O/EJmFqAfC6DQ+oWAIoQ6/wzypEFKFSI7gEAVGWc5YnAxALkc6Ptq74XaisR3UxGU4H1/lBdH7SZjuaCXFg8panttDUqzsQaeFKeqK7tsF/LO4XZgd8zin79NpqAftkfqlvVq8mDOcqlxbNT2AANuhH9GdoTNoCqRI/yDORxaUhYbCYPj6tscXa9RHhh8ewULoCqxFmeUlH/tfAH6r8NPIQKsL1GFZ5aQMZJvuwCD3DfTrs/2/Yhq3gDauGLh6x0w1jgoWuA21ai9Aq3gC+9wlZ46FJCu2auog+qA4lSdx4KHnpop5vgqehEfeHBcwfi7HqJFT5zZwSGB48APjdHlLrTqn9jXeHBeIh9bo5D/4dDwIMhQFG/tsMXJe6EHuGhZQltV9FUv3Hqjqu+CYWEhxYBfFbx0Fe50PDQEMBnFePELe4KHhoC3KA/rCBV7W9f8NDiIRun32eCrCwgPp5eFSduESdu0bdn0KBBg/4//QKBDsdopDriuwAAAABJRU5ErkJggg=="/></div>
              <button class="smartCaptcha_requested_NextPositive" id="smartCaptcha_checkInput" lno="1">Проверить</button>
            `;
            //Начинаем слушать событие для закрытия окна капчи
            smartCaptcha_requested_Close.onclick = function() {
                smartcaptcha_Block.style.display = "none";
              };
            //Начинаем слушать события движения кнопок
            smartCaptcha_requested_left.onclick = function() {
                current_rotation += 26;
                document.querySelector(".smartCaptcha_imageRotate").style.transform = 'rotate(' + current_rotation + 'deg)';
              };
            smartCaptcha_requested_right.onclick = function() {
                current_rotation -= 26;
                document.querySelector(".smartCaptcha_imageRotate").style.transform = 'rotate(' + current_rotation + 'deg)';
              };
            //Ожидаем событие нажатия кнопки для проверки правильности и завершения
                smartCaptcha_checkInput.onclick = function() {
                var xhr2 = new XMLHttpRequest();
                xhr2.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        //OK
                        var smartCaptcha_StatusOfResolv = this.responseText;
                        if(smartCaptcha_StatusOfResolv == 1){
                            document.getElementById("smartCaptcha_Element_Interact").innerHTML = `
                             <p lno="0">Yahoo! Captcha was solved!</p>
                             <button class="smartCaptcha_requested_NextPositive" id="smartCaptcha_requested_Close" lno="1">Close</button>
                            `;
                            localStorage.setItem('smartcaptcha_solutionkey', sn);
                            //Начинаем слушать событие для закрытия окна капчи после успеха
                            smartCaptcha_requested_Close.onclick = function() {
                                smartcaptcha_Block.style.display = "none";
                              };
                        } else {
                            document.getElementById("smartCaptcha_Element_Interact").innerHTML = `
                             <p lno="0">Captcha was solved incorrectly. Let's try again?</p>
                             <button class="smartCaptcha_requested_NextPositive" onclick="smartcaptcha(` + publickey + `, 'dark')" lno="1">Retry</button>
                            `;
                        }
                    } else {
                        document.getElementById("smartCaptcha_Element_Interact").innerHTML = `
                         <p lno="0">Sorry, looks like that our servers is very busy right now. Please try again in a minute.</p>
                         <button class="smartCaptcha_requested_NextPositive" onclick="smartcaptcha(` + publickey + `, 'dark')" lno="1">Retry</button>
                        `;
                    }
                };
                xhr2.open("POST", 'http://test.deqstudio.com/captcha/check.php', true);
                xhr2.setRequestHeader('Cache-Control', 'no-cache');

                var smartcaptcha_paramsToValidate = new FormData();
                smartcaptcha_paramsToValidate.append("sn", sn);
                var correct_rotationForProceed = current_rotation;

                if(correct_rotationForProceed >= 360 && correct_rotationForProceed >= 0){
                    correct_rotationForProceed = correct_rotationForProceed%360;
                } else if(correct_rotationForProceed <=0 && correct_rotationForProceed <= -360){
                    correct_rotationForProceed = correct_rotationForProceed%360;
                }

                if(correct_rotationForProceed < 0){
                    correct_rotationForProceed *= -1;
                    correct_rotationForProceed = 360 - correct_rotationForProceed;
                }

                correct_rotationForProceed = 360 - correct_rotationForProceed;
                smartcaptcha_paramsToValidate.append("dg", correct_rotationForProceed);
                xhr2.send(smartcaptcha_paramsToValidate);
            };
        } else {
            document.getElementById("smartCaptcha_Element_Interact").innerHTML = `
             <p lno="0">Sorry, looks like that our servers is very busy right now. Please try again in a minute.</p>
             <button class="smartCaptcha_requested_NextPositive" onclick="smartcaptcha(` + publickey + `, 'dark')" lno="1">Retry</button>
            `;
        }
    };
    xhr.open("GET", 'http://test.deqstudio.com/captcha/request.php', true);
    xhr.setRequestHeader('Content-Type', 'text');
    xhr.setRequestHeader('Cache-Control', 'no-cache');
    xhr.send();
}







