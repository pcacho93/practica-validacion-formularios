$(document).ready(function() {

    verificarCambios();



    //permitir visualizar password
    $('.unmask').on('click', function() {
        if ($(this).prev('input').attr('type') == 'password') {
            $(this).prev('input').attr('type', 'text');
        } else {
            $(this).prev('input').attr('type', 'password');

        }
    });

    
    //disparadores eventos
    $('input[name=cliente]', '#formulario').on('change', clienteSwitch);
    $('input[name=periodo]', '#formulario').on('change', verificarCambios);
    $('select[name=pais]', '#formulario').on('change', verificarCambios);
    $('#formulario').on('change', 'select[name=prov]', verificarCambios);
    $('input[name=cp]', '#formulario').on('change', verificarCambios);


    //funcion cambio particular/empresa
    function clienteSwitch() {
        if ($('input[name=cliente]:checked', '#formulario').val() === 'particular') {
            $('#cifNif').prop('placeholder', 'NIF');
            $('#fNombre').prop('placeholder', 'Nombre completo');
            $('#fNombre').val($('#nombre').val() + ' ' + $('#apellidos').val());
        } else {
            $('#cifNif').prop('placeholder', 'CIF');
            $('#fNombre').prop('placeholder', 'Nombre Empresa');
            $('#fNombre').val('');
        }
    }


    //funcion cambios varios
    function verificarCambios() {


            if ($('input[name=periodo]:checked', '#formulario').val() === 'mensual') {
                $('#tipocuota').html('<strong>mensual</strong>');
                $('#cuota').html('<strong>50</strong>');
            } else if ($('input[name=periodo]:checked', '#formulario').val() === 'trimestral') {
                $('#tipocuota').html('<strong>trimestral</strong>');
                $('#cuota').html('<strong>140</strong>');
            } else {
                $('#tipocuota').html('<strong>anual</strong>');
                $('#cuota').html('<strong>550</strong>');
            }

            $('#usuario').val($('#mail').val());
            if ($('#pais').val() === 'ES') {
                $('#provincias').load('php/load_provincias.php', {
                    cp: $('#cp').val(),
                });

                $('#loc').load('php/load_municipios.php', {
                    cp: $('#cp').val(),
                });

            } else {
                $('#provincias').html('<input type="text" name="prov" id="prov" placeholder="Provincia" /><span class="required"></span>');
                $('#loc').html('<input type="text" name="localidad" id="localidad" placeholder="Localidad" /><span class="required"></span>');
            }

            if ($('input[name=cliente]:checked', '#formulario').val() === 'particular') {
                $('#cifNif').prop('placeholder', 'NIF');
                $('#fNombre').prop('placeholder', 'Nombre completo');
                $('#fNombre').val($('#nombre').val() + ' ' + $('#apellidos').val());
            }

        } // VERIFICAR CAMBIOS />

    //VALIDACION FORM1

    $('#formulario').validate({
        errorPlacement: function(error, element) {
            error.appendTo(element.parent("div"));
        },
        rules: {
            nombre: "required",
            apellidos: "required",
            telefono: {
                required: true,
                digits: true,
                minlength: 9
            },
            mail: {
                email: true,
                required: true,
                remote: "php/validar_email_db.php"
            },
            mailv: {
                required: true,
                equalTo: '#mail'
            },
             cifNif: {
                            required: true,
                            nifES: function() { //additional
                                if ($('input[name=cliente]:checked', '#formulario').val() === 'particular') {
                                    return true;
                                }
                            },
                            cifES: function() { //additional
                                if ($('input[name=cliente]:checked', '#formulario').val() === 'empresa') {
                                    return true;
                                }
                            },
                            remote: function() {
                                if ($('input[name=cliente]:checked', '#formulario').val() === 'particular') {
                                    return "php/validar_nif_db.php"
                                }
                            }
                        },
                        fNombre: "required",
                        direccion: "required",
                        prov: "required",
                        localidad: "required",
                        pais: "required",

                        cp: {
                            required: true,
                            minlength: 5,
                            rule: function() { //añadir 0 cuando son 4 caracteres y el primero es un 0
                                var zip = $('#cp').val();
                                if (zip.length === 4) {
                                    $('#cp').val('0' + zip);
                                    
                                }
                            },
                            remote: function() {
                                if ($('#pais').val() === 'ES') {
                                    return "php/validar_zip_db.php"
                                }
                            }
                        },
                        iban: {
                            required: true,
                            iban: true
                        },
                        usuario: {
                                        required: true,
                                        minlength: 4
                                    },
                                    password: {
                                        required: true,
                                        pStrong: function(strong) {
                                            $("#password").complexify({}, function(valid, complexity) {
                                                $("#PassValue").val(complexity);
                                                if (complexity < 20) {
                                                    $('.passinfo').html('Debil');
                                                } else if (complexity >= 20 && complexity < 40) {
                                                    $('.passinfo').html('Normal');
                                                } else if (complexity >= 40 && complexity < 70) {
                                                    $('.passinfo').html('Fuerte');
                                                } else {
                                                    $('.passinfo').html('Muy Fuerte');
                                                }
                                                strong = complexity;
                                            });
                                            return strong;
                                        }
                                    },
                                    vPassword: {
                                        required: true,
                                        equalTo: '#password'
                                    }



        }, //cierra rules 1
        

        });
 


}); //DOCUMENT READY />