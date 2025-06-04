document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prompt-form');
    const generatedPromptTextarea = document.getElementById('generatedPrompt');
    const copyButton = document.getElementById('copyButton');

    // Template original fornecido pelo usuário
    const promptTemplate = "Highly detailed 3D cartoon-style scene of [CHARACTER NAME], keeping a consistent Pixar-inspired look, in a well-lit and colorful environment. The character has [describe hair: style, color], a [clean-shaven/bearded/etc] face, and a [relaxed/confident/surprised/etc] expression. He is wearing [describe clothing/outfit clearly and consistently]. His posture is [describe posture: sitting, walking, kicking, etc]. The background shows [describe scene setting: park, kitchen, soccer field, hotel balcony, etc] with dynamic lighting and vivid colors. Rendered in high-resolution, Pixar-quality with soft shadows and ambient lighting, ensuring consistency in character design, proportions, and environment aesthetics. Emphasize realism in cartoon texture, lighting, and atmosphere, with cinematic framing and a storytelling tone.";

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Obtém os valores dos campos do formulário
        const characterName = document.getElementById('characterName').value.trim();
        const hairDescription = document.getElementById('hairDescription').value.trim();
        // Combina barba/rosto e expressão em um campo, conforme o template
        const facialHairAndExpression = document.getElementById('facialHair').value.trim();
        const clothing = document.getElementById('clothing').value.trim();
        const posture = document.getElementById('posture').value.trim();
        const sceneSetting = document.getElementById('sceneSetting').value.trim();

        // Validação básica (campos obrigatórios já definidos no HTML)
        if (!characterName || !hairDescription || !facialHairAndExpression || !clothing || !posture || !sceneSetting) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Gera o prompt substituindo os placeholders
        let generatedPrompt = promptTemplate;
        generatedPrompt = generatedPrompt.replace('[CHARACTER NAME]', characterName);
        generatedPrompt = generatedPrompt.replace('[describe hair: style, color]', hairDescription);
        // Substitui a parte combinada de rosto/barba e expressão
        generatedPrompt = generatedPrompt.replace('[clean-shaven/bearded/etc] face, and a [relaxed/confident/surprised/etc] expression', facialHairAndExpression);
        generatedPrompt = generatedPrompt.replace('[describe clothing/outfit clearly and consistently]', clothing);
        generatedPrompt = generatedPrompt.replace('[describe posture: sitting, walking, kicking, etc]', posture);
        generatedPrompt = generatedPrompt.replace('[describe scene setting: park, kitchen, soccer field, hotel balcony, etc]', sceneSetting);

        // Exibe o prompt gerado na textarea
        generatedPromptTextarea.value = generatedPrompt;
    });

    // Adiciona funcionalidade de cópia ao botão
    copyButton.addEventListener('click', () => {
        if (generatedPromptTextarea.value) {
            generatedPromptTextarea.select();
            generatedPromptTextarea.setSelectionRange(0, 99999); // Para compatibilidade móvel

            try {
                // Tenta usar a API de Clipboard moderna
                navigator.clipboard.writeText(generatedPromptTextarea.value)
                    .then(() => {
                        // Feedback visual para o usuário
                        const originalText = copyButton.textContent;
                        copyButton.textContent = 'Copiado!';
                        copyButton.classList.add('btn-success');
                        copyButton.classList.remove('btn-secondary');
                        setTimeout(() => {
                            copyButton.textContent = originalText;
                            copyButton.classList.remove('btn-success');
                            copyButton.classList.add('btn-secondary');
                        }, 2000); // Volta ao normal após 2 segundos
                    })
                    .catch(err => {
                        console.error('Erro ao copiar texto com navigator.clipboard: ', err);
                        alert('Falha ao copiar o prompt. Por favor, copie manualmente.');
                    });
            } catch (err) {
                console.error('API de Clipboard não suportada ou erro: ', err);
                // Fallback para navegadores mais antigos
                try {
                    document.execCommand('copy');
                    const originalText = copyButton.textContent;
                    copyButton.textContent = 'Copiado!';
                    copyButton.classList.add('btn-success');
                    copyButton.classList.remove('btn-secondary');
                    setTimeout(() => {
                        copyButton.textContent = originalText;
                        copyButton.classList.remove('btn-success');
                        copyButton.classList.add('btn-secondary');
                    }, 2000);
                } catch (execErr) {
                    console.error('Erro ao copiar texto com document.execCommand: ', execErr);
                    alert('Falha ao copiar o prompt. Por favor, copie manualmente.');
                }
            }
        } else {
            alert('Nenhum prompt foi gerado ainda para copiar.');
        }
    });
});

