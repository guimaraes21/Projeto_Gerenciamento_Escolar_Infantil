const Aluno = require('./Aluno');
const Professor = require('./Professor');
const Turma = require('./Turma');
const Disciplina = require('./Disciplina');
const Aula = require('./Aula');
const Frequencia = require('./Frequencia');
const Avaliacao = require('./Avaliacao');
const Matricula = require('./Matricula');
const Pagamento = require('./Pagamento');
const Material = require('./Material');
const RequisicaoMaterial = require('./RequisicaoMaterial');
const Evento = require('./Evento');
const ParticipacaoEvento = require('./ParticipacaoEvento');
const Comunicado = require('./Comunicado');
const RecebimentoComunicado = require('./RecebimentoComunicado');

// Definindo associações adicionais para relacionamentos M:N
// (as associações simples já estão definidas nos modelos individuais)

// Exportando todos os modelos
module.exports = {
    Aluno,
    Professor,
    Turma,
    Disciplina,
    Aula,
    Frequencia,
    Avaliacao,
    Matricula,
    Pagamento,
    Material,
    RequisicaoMaterial,
    Evento,
    ParticipacaoEvento,
    Comunicado,
    RecebimentoComunicado
};
