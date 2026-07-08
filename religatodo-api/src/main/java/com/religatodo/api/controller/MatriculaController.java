package com.religatodo.api.controller;

import com.religatodo.api.entity.Aluno;
import com.religatodo.api.entity.Disciplina;
import com.religatodo.api.entity.Matricula;
import com.religatodo.api.entity.Professor;
import com.religatodo.api.repository.AlunoRepository;
import com.religatodo.api.repository.DisciplinaRepository;
import com.religatodo.api.repository.MatriculaRepository;
import com.religatodo.api.repository.ProfessorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.Year;
import java.util.List;
import java.util.Optional;

// A anotação @RestController diz ao Java: "Essa classe vai receber requisições da internet (API)"
@RestController
// Define o endereço base para todas as rotas desse controller (ex: http://localhost:8080/api/matriculas)
@RequestMapping("/api/matriculas")
// Permite que o seu Front-end (React na porta 5173) possa acessar essa API
@CrossOrigin(origins = "http://localhost:5173")
// O @RequiredArgsConstructor cria o construtor automaticamente para injetar os repositórios
@RequiredArgsConstructor
public class MatriculaController {

    // Declaração dos repositórios (eles são as "pontes" que o Java usa para conversar com o MySQL)
    private final MatriculaRepository matriculaRepository;
    private final AlunoRepository alunoRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final ProfessorRepository professorRepository; 

    // ==========================================================
    // CREATE (Criar): Criar uma nova matrícula
    // ==========================================================
    @PostMapping
    public ResponseEntity<?> criarMatricula(@RequestBody MatriculaRequestDTO dados) {
        // 1. Busca o aluno no MySQL usando o ID enviado pelo Front-end
        Aluno aluno = alunoRepository.findById(dados.getIdAluno())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        // 2. Busca a disciplina no MySQL usando o ID enviado
        Disciplina disciplina = disciplinaRepository.findById(dados.getIdDisciplina())
                .orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));

        // 3. Cria um novo objeto "Matricula" para salvar no banco
        Matricula novaMatricula = new Matricula();
        novaMatricula.setAluno(aluno);
        novaMatricula.setDisciplina(disciplina);
        novaMatricula.setBimestre(dados.getBimestre());
        novaMatricula.setAnoLetivo(Year.now().getValue()); // Pega o ano atual automaticamente
        novaMatricula.setStatus("ativa");

        // 4. Salva o objeto no MySQL e pega o ID gerado pelo banco
        Matricula matriculaSalva = matriculaRepository.save(novaMatricula);

        // 5. Retorna apenas o ID da matrícula para o React (sem texto, apenas o número)
        return ResponseEntity.ok(matriculaSalva.getId());
    }

    // ==========================================================
    // READ (Ler): Listar todas as matérias que o aluno está matriculado
    // ==========================================================
    @GetMapping("/aluno/{idUsuario}")
    public ResponseEntity<List<Matricula>> listarMatriculasDoAluno(@PathVariable Long idUsuario) {
        // O método findByUsuarioId busca todas as matrículas desse aluno no banco
        return ResponseEntity.ok(matriculaRepository.findByUsuarioId(idUsuario));
    }

    // ==========================================================
    // READ (Ler): Verificar se o aluno já está matriculado em uma disciplina específica
    // ==========================================================
    @GetMapping("/aluno/{idUsuario}/disciplina/{idDisciplina}")
    public ResponseEntity<?> buscarMatriculaAtiva(
            @PathVariable Long idUsuario, 
            @PathVariable Long idDisciplina) {
        
        // 1. Busca todas as matérias do aluno
        List<Matricula> matriculasDoAluno = matriculaRepository.findByUsuarioId(idUsuario);
        
        // 2. Filtra essa lista para achar a matrícula da disciplina específica
        Optional<Matricula> matriculaEncontrada = matriculasDoAluno.stream()
                .filter(m -> m.getDisciplina().getId().equals(idDisciplina))
                .findFirst();

        // 3. Se encontrou, devolve a matrícula. Se não, devolve erro 404 (não encontrado)
        if (matriculaEncontrada.isPresent()) {
            return ResponseEntity.ok(matriculaEncontrada.get());
        } else {
            return ResponseEntity.status(404).body("Aluno ainda não está matriculado nesta disciplina.");
        }
    }

    // ==========================================================
    // UPDATE (Atualizar): Escolher/Alterar o professor da matrícula
    // ==========================================================
    @PutMapping("/{idMatricula}/professor")
    public ResponseEntity<?> escolherProfessor(
            @PathVariable Long idMatricula, 
            @RequestBody ProfessorEscolhaDTO dados) {
        
        // 1. Busca a matrícula no banco de dados
        Matricula matricula = matriculaRepository.findById(idMatricula)
                .orElseThrow(() -> new RuntimeException("Matrícula não encontrada!"));
        
        // 2. Busca o professor escolhido no banco de dados
        Professor professor = professorRepository.findById(dados.getIdProfessor())
                .orElseThrow(() -> new RuntimeException("Professor não encontrado!"));

        // 3. Atualiza a matrícula com o novo professor e salva no MySQL
        matricula.setProfessorEscolhido(professor);
        matriculaRepository.save(matricula);

        return ResponseEntity.ok("Professor escolhido com sucesso!");
    }

    // ==========================================================
    // DELETE (Excluir): Cancelar/Remover a matrícula do aluno (FECHA O CRUD 2)
    // ==========================================================
    @DeleteMapping("/{idMatricula}")
    public ResponseEntity<?> cancelarMatricula(@PathVariable Long idMatricula) {
        // 1. Verifica se a matrícula realmente existe no MySQL antes de tentar deletar
        if (!matriculaRepository.existsById(idMatricula)) {
            return ResponseEntity.status(404).body("Matrícula não encontrada.");
        }
        // 2. Manda o MySQL deletar esse registro da tabela 'matriculas'
        matriculaRepository.deleteById(idMatricula);
        return ResponseEntity.ok("Matrícula cancelada com sucesso!");
    }
}

// ==========================================================
// DTO (Data Transfer Object): Classes para receber dados do React
// ==========================================================

// 1. DTO para criar uma nova matrícula (Recebe JSON: { "idAluno": 1, "idDisciplina": 1, "bimestre": 1 })
class MatriculaRequestDTO {
    private Long idAluno;
    private Long idDisciplina;
    private Integer bimestre;
    
    public Long getIdAluno() { return idAluno; }
    public void setIdAluno(Long idAluno) { this.idAluno = idAluno; }
    public Long getIdDisciplina() { return idDisciplina; }
    public void setIdDisciplina(Long idDisciplina) { this.idDisciplina = idDisciplina; }
    public Integer getBimestre() { return bimestre; }
    public void setBimestre(Integer bimestre) { this.bimestre = bimestre; }
}

// 2. DTO para escolher um professor (Recebe JSON: { "idProfessor": 5 })
class ProfessorEscolhaDTO {
    private Long idProfessor;

    public Long getIdProfessor() { return idProfessor; }
    public void setIdProfessor(Long idProfessor) { this.idProfessor = idProfessor; }
}