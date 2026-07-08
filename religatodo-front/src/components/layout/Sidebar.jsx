// // src/components/layout/Sidebar.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// // import styles from './Sidebar.module.css'; // Descomente caso vá usar estilos modulares específicos aqui

// // Recebemos 'activeItem' como prop para saber qual botão deve ficar destacado
// export default function Sidebar({ activeItem = 'Início' }) {
//   const navigate = useNavigate();

//   // Array centralizado de rotas. Alterou aqui, altera no site inteiro.
//   const menuItens = [
//     { label: 'Início', icon: '🏠', rota: '/painel' },
//     { label: 'Matemática', icon: '📐', rota: '/materia', classeHover: 'sidebar-math' },
//     { label: 'Biologia', icon: '🧬', classeHover: 'sidebar-bio' },
//     { label: 'Física', icon: '⚛️', classeHover: 'sidebar-physics' },
//     { label: 'História', icon: '🏛️', classeHover: 'sidebar-history' },
//     { label: 'Português', icon: '📖', classeHover: 'sidebar-portuguese' },
//     { label: 'Plantão de dúvidas', icon: '💬' },
//     { label: 'Agendar prova', icon: '🗓️' },
//     { label: 'Meu perfil', icon: '👤' },
//   ];

//   return (
//     <aside 
//       className="hidden md:flex flex-column w-15rem surface-0 border-right-1 sticky p-4" 
//       /* 
//        * LÓGICA DE POSICIONAMENTO: 
//        * O 'top: 72px' empurra o menu para baixo do Header global.
//        * O 'height: calc(100vh - 72px)' impede que ele passe do rodapé da tela.
//        */
//       style={{ height: 'calc(100vh - 72px)', top: '72px', borderColor: 'var(--border)' }}
//     >
//       <ul className="list-none p-0 m-0 flex flex-column gap-2 overflow-y-auto">
//         {menuItens.map((item, idx) => {
//           // Validação para aplicar a cor do item selecionado
//           const isAtivo = item.label === activeItem;
          
//           return (
//             <li key={idx}>
//               <a 
//                 href="#" 
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (item.rota) navigate(item.rota);
//                 }}
//                 className={`flex align-items-center gap-3 px-3 py-2 border-round-lg cursor-pointer text-sm font-medium no-underline sidebar-item ${item.classeHover || ''} ${isAtivo ? 'surface-100 text-900' : 'text-600 bg-transparent'}`}
//               >
//                 <span className="text-xl">{item.icon}</span> {item.label}
//               </a>
//             </li>
//           );
//         })}
//       </ul>
//     </aside>
//   );
// }