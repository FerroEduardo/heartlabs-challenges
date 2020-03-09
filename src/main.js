let horasDiarias = 0;
let diasEfetivos = 0;
let diasFerias = 0;
let valorTotalDoProjeto = 0;
let valorHora;
let timeout;
$("document").ready(function () {
    $("#calcularBtn").click(function () {
        let inputs = $("input");
        let ok = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute("type") === "number") {
                if (!inputs[i].checkValidity() || inputs[i].value === "") {
                    // insertToast(inputs[i].value.length);
                    insertToast(inputs[i].labels[0].textContent);
                    ok = false;

                }
            }
        }
        if (ok) {
            // insertToast("ok");
            horasDiarias = parseFloat($("#horasDiarias").val());
            diasEfetivos = parseFloat($("#diasEfetivos").val());
            diasFerias = parseFloat($("#diasFerias").val());
            valorTotalDoProjeto = parseFloat($("#valorTotalDoProjeto").val());
            valorHora = (valorTotalDoProjeto / (diasEfetivos * 4 * horasDiarias)) + ((diasFerias * diasEfetivos * horasDiarias));
            // insertToast(valorHora.toFixed(2));
            $("#calculadora").fadeOut(function () {
                let result = $("#result");
                result[0].innerHTML = "<h1>Seu valor por hora é: " + valorHora.toFixed(2) + "</h1>" + result[0].innerHTML;
                result.fadeIn();
                $("#calcularDnv").click(function () {
                    let result = $("#result");
                    result.fadeOut();
                    result[0].firstChild.outerHTML = "";
                    $("#calculadora").fadeIn();
                });
            });
        }
    });


});

function insertToast(campo) {
    let toast = "<div class=\"toast\" role=\"alert\" aria-live=\"assertive\" aria-atomic=\"true\" data-delay=\"3000\">\n" +
        "            <div class=\"toast-header\">\n" +
        "                <img src=\"./assets/miniLogo.png\" class=\"rounded mr-2\" alt=\"he4rt.icon\">\n" +
        "                <strong class=\"mr-auto\">Calculadora de Freela - He4rtDevs</strong>\n" +
        "                <button type=\"button\" class=\"ml-2 mb-1 close\" data-dismiss=\"toast\" aria-label=\"Close\">\n" +
        "                    <span aria-hidden=\"true\">&times;</span>\n" +
        "                </button>\n" +
        "            </div>\n" +
        "            <div class=\"toast-body\">\n" +
        '                O valor do campo "'+campo+'" é inválido\n' +
        "            </div>\n" +
        "        </div>";
    $("#notifications")[0].innerHTML = $("#notifications")[0].innerHTML + toast;
    $('.toast').toast('show');
    if(timeout)
        clearTimeout(timeout);
    timeout = setTimeout(function () {
        $("#notifications")[0].innerHTML = ""
    },3400);
}