package com.religatodo.api.repository;

import com.religatodo.api.entity.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface AlunoRepository extends JpaRepository<Aluno, Long> {
    // Esse método mágico vai buscar o aluno automaticamente pelo ID do usuário logado
    Optional<Aluno> findByUsuarioId(Long idUsuario);
}