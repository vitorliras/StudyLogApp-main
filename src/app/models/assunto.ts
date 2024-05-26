export interface Assunto {
    id: number ;
    id_conteudo: number ;
    titulo: string ;
    numeracao: string ;
    estudado: boolean;
    tituloConteudo?: string;
    dataConcluida?: Date ;
    quantidadeSubAssunto?: number;
    quantidadeSubAssuntoFeitos?: number;
  }
  