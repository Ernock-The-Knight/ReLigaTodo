package com.religatodo.api.controller;

import com.religatodo.api.entity.Aluno;
import com.religatodo.api.entity.AlunoFavorito;
import com.religatodo.api.entity.Disciplina;
import com.religatodo.api.repository.AlunoFavoritoRepository;
import com.religatodo.api.repository.AlunoRepository;
import com.religatodo.api.repository.DisciplinaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AlunoFavoritoController {

    private final AlunoFavoritoRepository favoritoRepository;
    private final AlunoRepository alunoRepository;
    private final DisciplinaRepository disciplinaRepository;

        // GET: Listar as disciplinas favoritas de um aluno
    @GetMapping("/aluno/{idUsuario}")
    public ResponseEntity<List<Disciplina>> listarFavoritos(@PathVariable Long idUsuario) {
        Aluno aluno = alunoRepository.findByUsuarioId(idUsuario)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
        
        List<AlunoFavorito> favoritos = favoritoRepository.findByAluno_IdAluno(aluno.getIdAluno());
        
        // 🛑 CORREÇÃO AQUI: Adicionei um '.filter(Objects::nonNull)' antes do '.map'.
        // Isso diz ao Java: "Se a disciplina for nula, não a coloque na lista, ignore-a".
        List<Disciplina> disciplinas = favoritos.stream()
                .map(AlunoFavorito::getDisciplina)
                .filter(Objects::nonNull) // <-- Essa linha resolve o aviso amarelo!
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(disciplinas);
    }

    // POST: Adicionar uma disciplina aos favoritos
    @PostMapping
    public ResponseEntity<?> adicionarFavorito(@RequestParam Long idAluno, @RequestParam Long idDisciplina) {
        try {
            // 🛑 Verificação simples para evitar duplicata antes de tentar salvar
            if (favoritoRepository.findByAluno_IdAlunoAndDisciplina_Id(idAluno, idDisciplina).isPresent()) {
                return ResponseEntity.badRequest().body("Esta disciplina já está nos seus favoritos!");
            }
            
            Aluno aluno = alunoRepository.findById(idAluno).orElseThrow(() -> new RuntimeException("Aluno não encontrado"));
            Disciplina disciplina = disciplinaRepository.findById(idDisciplina).orElseThrow(() -> new RuntimeException("Disciplina não encontrada"));
            
            AlunoFavorito favorito = new AlunoFavorito();
            favorito.setAluno(aluno);
            favorito.setDisciplina(disciplina);
            
            favoritoRepository.save(favorito);
            return ResponseEntity.ok("Disciplina adicionada aos favoritos!");
            
        } catch (DataIntegrityViolationException e) {
            // 🛑 Se o MySQL ainda assim tentar criar uma duplicata, tratamos aqui e devolvemos 400
            return ResponseEntity.badRequest().body("Esta disciplina já está nos seus favoritos!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erro interno ao adicionar favorito: " + e.getMessage());
        }
    }

    // DELETE: Remover uma disciplina dos favoritos
    @DeleteMapping
    public ResponseEntity<?> removerFavorito(@RequestParam Long idAluno, @RequestParam Long idDisciplina) {
        try {
            AlunoFavorito favorito = favoritoRepository.findByAluno_IdAlunoAndDisciplina_Id(idAluno, idDisciplina)
                    .orElseThrow(() -> new RuntimeException("Favorito não encontrado"));
            favoritoRepository.delete(favorito);
            return ResponseEntity.ok("Disciplina removida dos favoritos!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao remover favorito: " + e.getMessage());
        }
    }
}