import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registrarUsuario, buscarUsuarioPorEmail } from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seuSegredoJWT';

export async function registrar(req, res) {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Email já cadastrado.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    await registrarUsuario(nome, email, senhaHash);

    res.status(201).json({ mensagem: 'Usuário registrado com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao registrar usuário.' });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;

  try {
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Senha incorreta.' });
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ mensagem: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro ao fazer login.' });
  }
}
