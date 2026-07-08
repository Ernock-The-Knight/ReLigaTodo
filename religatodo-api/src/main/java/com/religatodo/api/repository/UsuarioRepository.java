// Define o pacote onde este arquivo está localizado dentro do projeto.
package com.religatodo.api.repository;

// Importa a entidade Usuario, que representa a tabela 'usuarios' no banco de dados.
import com.religatodo.api.entity.Usuario;
// Importa as ferramentas do Spring Data JPA para gerenciar o banco de dados.
import org.springframework.data.jpa.repository.JpaRepository;
// Importa o Optional, que serve para evitar erros caso o usuário não seja encontrado (retorna um "pode ser nulo" seguro).
import java.util.Optional;

// A interface 'UsuarioRepository' estende 'JpaRepository'.
// Isso diz ao Spring: "Gerencie a tabela 'usuarios' automaticamente para mim, usando a classe 'Usuario' e o ID do tipo 'Long'".
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // 🔹 MÉTODO JÁ EXISTENTE: Verifica se já existe um usuário com esse email no banco.
    // O Spring Data JPA é mágico: ele traduz o nome do método (existsByEmail) em uma consulta SQL automaticamente.
    // Retorna 'true' se o email já existir, ou 'false' se não existir.
    boolean existsByEmail(String email);

    // =====================================================================
    // 🆕 MÉTODO ADICIONADO AGORA PARA FAZER O LOGIN FUNCIONAR:
    // =====================================================================
    // Procura um usuário no banco de dados usando o email fornecido.
    // Retorna um 'Optional<Usuario>'.
    // Se o usuário for encontrado, o Optional conterá o objeto 'Usuario'.
    // Se não for encontrado, o Optional estará vazio (evitando o famoso erro "NullPointerException").
    Optional<Usuario> findByEmail(String email);
}