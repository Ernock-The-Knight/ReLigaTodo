package com.religatodo.api.controller;

import com.religatodo.api.dto.CadastroRequestDTO;
import com.religatodo.api.entity.Aluno;
import com.religatodo.api.entity.Usuario;
import com.religatodo.api.repository.AlunoRepository;
import com.religatodo.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final AlunoRepository alunoRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrar(@RequestBody CadastroRequestDTO dados) {
        if (usuarioRepository.existsByEmail(dados.getEmail())) {
            return ResponseEntity.badRequest().body("Email já cadastrado!");
        }

        String senhaCriptografada = new BCryptPasswordEncoder().encode(dados.getSenha());

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(dados.getNome());
        novoUsuario.setEmail(dados.getEmail());
        novoUsuario.setSenhaHash(senhaCriptografada);
        novoUsuario.setCpf(dados.getCpf());

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);

        // Cria o perfil de Aluno automaticamente
        Aluno novoAluno = new Aluno();
        novoAluno.setUsuario(usuarioSalvo);
        novoAluno.setDataMatricula(LocalDate.now());
        novoAluno.setBimestreEntrada(1);
        novoAluno.setTagAcessibilidade("nenhuma");
        alunoRepository.save(novoAluno);

        return ResponseEntity.ok(usuarioSalvo);
    }

    // =======================================================
    // 🆕 ENDPOINT DE LOGIN CORRIGIDO (SEM ERRO 500)
    // =======================================================
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginData) {
        // 1. Busca o usuário pelo email no banco, sem lançar exceção.
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(loginData.getEmail());
        
        // 2. Se não existir, retorna 401 (Não autorizado) ao invés de 500 (Erro interno).
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }
        
        Usuario usuario = usuarioOpt.get();

        // 3. Verifica a senha. Se não bater, retorna 401.
        if (!new BCryptPasswordEncoder().matches(loginData.getSenha(), usuario.getSenhaHash())) {
            return ResponseEntity.status(401).body("Email ou senha inválidos");
        }

        // 4. Se passou pelas duas verificações, retorna o usuário.
        return ResponseEntity.ok(usuario);
    }
}

// DTO para Cadastro (Importado de outro pacote, sem conflitos)
// DTO para Login (Apenas este fica aqui, pois não existe em outro lugar)
class LoginRequestDTO {
    private String email;
    private String senha;
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}