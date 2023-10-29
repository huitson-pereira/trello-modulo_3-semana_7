const { Geracao } = require('../models/geracao');
const { Unidade } = require('../models/unidade');

class GeracaoController {
  async createGeraco(req, res) {
    try {
      const { idUnit, date, total } = req.body;

      if (!idUnit || !date || !total) {
        return res
          .status(400)
          .json({ error: 'Todos os campos devem ser preenchidos.' });
      }

      const unitExisting = await Unidade.findOne({ where: { id: idUnit } });
      if (!unitExisting) {
        return res.status(400).json({
          message: `A unidade de Id ${idUnit} não existe.`,
        });
      }

      const datePattern = /^(0[1-9]|1[0-2])-\d{4}$/;
      if (!datePattern.test(date)) {
        return res
          .status(400)
          .json({ error: 'Formato de data inválido. Use MM-YYYY.' });
      }

      const newGeracao = await Geracao.create({
        idUnit,
        date,
        total,
      });

      return res.status(201).json({
        message: 'Lançamento cadastrado com sucesso!',
        newGeracao,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro no servidor.',
        cause: error.message,
      });
    }
  }

  async listGeracaoId(req, res) {
    try {
      const { unidadeId  } = req.params;
      const geracao = await Geracao.findOne({
        where: { idUnit: unidadeId },
      });

      if (!geracao) {
        return res.status(400).json({
          error: 'Id não encontrado!',
        });
      }
      return res.status(200).json({
        message: 'Id encontrado com sucesso!',
        geracao
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro no servidor.',
        cause: error.message,
      });
    }
  }

  async getAllGeracaos(req, res) {
    try {
      const geracaos = await Geracao.findAll();
      if (geracaos.length === 0) {
        return res.status(404).json({
          message: 'Não há lançamentos cadastrados até o momento.',
        });
      }

      return res.status(200).json(geracaos);
    } catch (error) {
      return res.status(500).send({
        message: 'Erro no servidor.',
        cause: error.message,
      });
    }
  }

  async deleteGeracao(req, res) {
    try {
      const { id } = req.params;
      const geracao = await Geracao.findOne({
        where: { id },
      });
      if (!geracao) {
        return res.status(400).json({ error: 'id inválido!' });
      }
      await geracao.destroy({
        where: { id },
      });
      return res.status(204).json({
        messagem: 'Deletado com sucesso!',
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro no servidor.',
        cause: error.message,
      });
    }
  }

  async updateGeracao(req, res) {
    try {
      const { id } = req.params;
      const { date, total } = req.body;

      if (!date && !total) {
        return res.status(400).json({
          message: 'Todos os campos devem ser preenchidos.',
        });
      }

      if (!id || isNaN(id) || parseInt(id) <= 0) {
        return res.status(400).json({ error: 'ID inválido.' });
      }

      const geracaoExisting = await Geracao.findByPk(id);
      if (!geracaoExisting) {
        return res.status(404).json({
          message: 'Registro não encontrado.',
        });
      }

      geracaoExisting.date = date;
      geracaoExisting.total = total;

      await geracaoExisting.save();

      return res.status(200).json({
        message: 'Registro atualizado com sucesso!',
        geracaoExisting,
      });
    } catch (error) {
      return res.status(500).send({
        message: 'Erro no servidor.',
        cause: error.message,
      });
    }
  }
}

module.exports = new GeracaoController();
