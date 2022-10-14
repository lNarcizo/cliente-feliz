$(function () {

    $('#client-table').DataTable();

    $("#close,#closeX").on("click", function(){
        $('#name').val('');
        $('#cpfCnpj').val('');
        $('#cep').val('');
        $('#city').val('');
        $('#end').val('');
    });

    $("#closeEdit,#closexEdit").on("click", function(){
        $('#nameEdit').val('');
        $('#cpfCnpjEdit').val('');
        $('#cepEdit').val('');
        $('#cityEdit').val('');
        $('#endEdit').val('');
    });

    function getFormData(form){
        const formArray = form.serializeArray();
        const newObj = {};
    
        $.map(formArray, function(arr){
            newObj[arr["name"]] = arr["value"];
        });
    
        return newObj;
    }

    $("#form").on("submit", function (event){

        event.preventDefault();

        let dadosForm = JSON.stringify(getFormData($(this)));
    
        $.ajax({
            type: "post",
            url: "/client/create",
            data: dadosForm,
            dataType: 'json',
            contentType: 'application/json',
            success: function(resp) {
                $("#close").click();

                if(!resp.error){
                    toastr.success(resp.message,'Sucesso!');
                } else {
                    toastr.error(resp.message,'Erro!');
                }
            }
        });

    });

    $(".btn-edit").on("click", function() {

        let id = $(this).val();

        $.ajax({
            type: "get",
            url: `/client/edit/${id}`,
            contentType: 'application/json',
            success: function(resp) {

                resp = JSON.parse(resp);

                if(!resp.error){
                    $('#id').val(resp.dados.id);
                    $('#nameEdit').val(resp.dados.nome);
                    $('#cpfCnpjEdit').val(resp.dados.cpfCnpj);
                    $('#cepEdit').val(resp.dados.cep);
                    $('#cityEdit').val(resp.dados.cidade);
                    $('#endEdit').val(resp.dados.endereco);
                } else {
                    toastr.error(resp.message,'Erro!');
                }
            }
        });
    });

    $("#formEdit").on("submit", function (event){

        event.preventDefault();

        let dadosForm = JSON.stringify(getFormData($(this)));

        let id = $('#id').val();
    
        $.ajax({
            type: "put",
            url: `/client/edit/${id}`,
            data: dadosForm,
            dataType: 'json',
            contentType: 'application/json',
            success: function(resp) {
                $("#closeEdit").click();

                if(!resp.error){
                    toastr.success(resp.message,'Sucesso!');
                } else {
                    toastr.error(resp.message,'Erro!');
                }
            }
        });

    });

    $(".formDelete").on("submit", function (event){

        event.preventDefault();


        let objDados = getFormData($(this));

        let id = objDados.idDelete;

        let dadosForm = JSON.stringify(objDados);

        $.MessageBox({
            buttonDone  : "Sim",
            buttonFail  : "Não",
            title       : "Confirme",
            message     : "Deseja mesmo excluir este cliente?"
        }).done(function(){

            $.ajax({
                type: "delete",
                url: `/client/delete/${id}`,
                data: dadosForm,
                dataType: 'json',
                contentType: 'application/json',
                success: function(resp) {

                    if(!resp.error){
                        toastr.success(resp.message,'Sucesso!');
                    } else {
                        toastr.error(resp.message,'Erro!');
                    }
                }
            });
        });
    });

});