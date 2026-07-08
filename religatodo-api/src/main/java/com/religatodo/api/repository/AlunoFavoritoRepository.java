package com.religatodo.api.repository;

import com.religatodo.api.entity.AlunoFavorito;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AlunoFavoritoRepository extends JpaRepository<AlunoFavorito, Long> {
    // Métodos com a navegação correta pelo campo 'aluno' da entidade
    List<AlunoFavorito> findByAluno_IdAluno(Long idAluno);
    
    Optional<AlunoFavorito> findByAluno_IdAlunoAndDisciplina_Id(Long idAluno, Long idDisciplina);
}