package com.religatodo.api.repository;

import com.religatodo.api.entity.Matricula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    
    // Query customizada para buscar as matrículas de um aluno específico pelo ID do usuário
    @Query("SELECT m FROM Matricula m JOIN m.aluno a WHERE a.usuario.id = :idUsuario")
    List<Matricula> findByUsuarioId(@Param("idUsuario") Long idUsuario);
}