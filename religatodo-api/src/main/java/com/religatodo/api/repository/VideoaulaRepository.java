package com.religatodo.api.repository;

import com.religatodo.api.entity.Videoaula;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface VideoaulaRepository extends JpaRepository<Videoaula, Long> {
    // Método mágico para buscar aulas de uma disciplina específica
    List<Videoaula> findByTopico_Disciplina_Id(Long idDisciplina);
}