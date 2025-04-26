document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('clientForm');
    
    // Máscaras
    document.getElementById('cpf').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        e.target.value = value;
    });

    document.getElementById('telefone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.substring(0, 11);
        
        if (value.length <= 10) {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4})(\d)/, '$1-$2');
        } else {
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
        }
        e.target.value = value;
    });

    document.getElementById('cep').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.value = value;
    });

    // Validação de formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;

        // Validação básica de campos obrigatórios
        const requiredFields = ['nome', 'email', 'cpf', 'idade', 'telefone', 
                              'cep', 'tipoLogradouro', 'logradouro', 'numero', 
                              'bairro', 'cidade', 'estado'];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field);
            if (!element.value.trim()) {
                showError(field, 'Este campo é obrigatório');
                isValid = false;
            }
        });

        // Validação de e-mail
        const email = document.getElementById('email');
        if (!validateEmail(email.value)) {
            showError('email', 'E-mail inválido');
            isValid = false;
        }

        // Validação de CPF
        const cpf = document.getElementById('cpf');
        if (!validateCPF(cpf.value.replace(/\D/g, ''))) {
            showError('cpf', 'CPF inválido');
            isValid = false;
        }

        // Validação de idade
        const idade = document.getElementById('idade');
        if (idade.value < 13 || idade.value > 120) {
            showError('idade', 'Idade deve ser entre 13 e 120 anos');
            isValid = false;
        }

        // Validação de interesses
        const interesses = document.querySelectorAll('input[name="interesses"]:checked');
        if (interesses.length === 0) {
            showError('interesses', 'Selecione pelo menos um interesse');
            isValid = false;
        }

        // Validação de arquivo
        const documento = document.getElementById('documento');
        if (documento.files.length > 0) {
            const file = documento.files[0];
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024; // 5MB
            
            if (!validTypes.includes(file.type)) {
                showError('documento', 'Tipo de arquivo inválido (use PDF, JPG ou PNG)');
                isValid = false;
            }
            
            if (file.size > maxSize) {
                showError('documento', 'Arquivo muito grande (máximo 5MB)');
                isValid = false;
            }
        }

        if (isValid) {
            alert('Formulário validado (simulação)');
            form.reset();
        }
    });

    // Funções auxiliares
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateCPF(cpf) {
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let mod = sum % 11;
        const digit1 = mod < 2 ? 0 : 11 - mod;
        
        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(cpf.charAt(i)) * (11 - i);
        }
        mod = sum % 11;
        const digit2 = mod < 2 ? 0 : 11 - mod;
        
        return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
    }
});
