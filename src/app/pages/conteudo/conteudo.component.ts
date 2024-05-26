import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Assunto } from "src/app/models/assunto";
import { AssuntoServiceService } from "src/app/service/assunto-service.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SubSubAssuntoServiceService } from "src/app/service/sub-assunto-service.service";
import { ConteudoServiceService } from "src/app/service/conteudo-service.service";
import { Conteudo } from "src/app/models/conteudo";
import { SubAssunto } from "src/app/models/subAssunto";

@Component({
  selector: "app-conteudo",
  templateUrl: "./conteudo.component.html",
  styleUrls: ["./conteudo.component.css"],
})
export class ConteudoComponent implements OnInit {
  @ViewChild('inputSub') inputSub: HTMLInputElement | undefined;
  configurando: boolean = false;
  configInvalido: boolean = false;
  pesquisando: boolean = true;
  podeCopiar: boolean = false;
  podeDeletar: boolean = false;
  podeReverter: boolean = true;
  podeEditar: boolean = false;
  podeIncluir: boolean = false;
  podeSalvar: boolean = true;
  podePesquisar: boolean = false;
  salvando: boolean = true;
  podeAtivar: boolean = false;
  exclusaoConfirmada: boolean = false;
  reverterConfirmado: boolean = false;
  mensagemModal: string = "";

  assuntoCadastrados: Assunto[] = [];
  conteudos: Conteudo[] = [];
  subAssuntos: SubAssunto[] = [];
  conteudo!: Conteudo;
  assunto!: Assunto;
  subAssunto!: SubAssunto;
  idsConteudos: number[] = [];

  ordenacaoCodigoAtual: "crescente" | "decrescente" | "padrao" = "padrao";
  ordenacaoCnpjAtual: "crescente" | "decrescente" | "padrao" = "padrao";
  ordenacaoRazaoAtual: "crescente" | "decrescente" | "padrao" = "padrao";
  ordenacaoSiglaAtual: "crescente" | "decrescente" | "padrao" = "padrao";
  ordenacaoEnderecoAtual: "crescente" | "decrescente" | "padrao" = "padrao";

  configForm = this.fb.group({
    codigo: [{ value: "", disabled: true }, Validators.required],
    razao: ["", [Validators.required]],
    sigla: ["", [Validators.required]],
    endereco: ["", [Validators.required]],
    codSistema: [""],
    cnpj: ["", [Validators.required]],
  });

  displayedColumns: string[] = [
    "numero",
    "conteudo",
    "titulo",
    "sub",
    "estudado",
  ];
  displayedColumnsSub: string[] = ["numero", "titulo", "estudado"];
  dataSource: MatTableDataSource<Assunto>;
  dataSourceSub: MatTableDataSource<SubAssunto>;

  constructor(
    private fb: FormBuilder,
    private assuntoService: AssuntoServiceService,
    private subAssuntoService: SubSubAssuntoServiceService,
    private conteudoService: ConteudoServiceService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Assunto>([]);
    this.dataSourceSub = new MatTableDataSource<SubAssunto>([]);
  }

  ngOnInit(): void {
    this.carregarConteudoCadastrados();
    this.carregarSubAssuntoCadastrados();
  }

  carregarConteudoCadastrados() {
    this.conteudoService.getAllConteudo().subscribe(
      (conteudo) => {
        this.conteudos = conteudo.map((conteudo) => {
          return conteudo;
        });
        // this.dataSource = new MatTableDataSource<Assunto>(this.assuntoCadastrados);
      },
      (error: any) => {
        this.mostrarMensagem("Cep digitado de forma incorreta!", "danger");
      }
    );
  }

  filtrarConteudo(ev: any) {
    if (this.idsConteudos.length > 0) {
      const index = this.idsConteudos.indexOf(ev);
      if (index > -1) {
        this.idsConteudos.splice(index, 1);
      } else {
        this.idsConteudos.push(ev);
      }
    } else {
      this.idsConteudos.push(ev);
    }
    if (this.idsConteudos.length > 0) {
      this.carregarAssuntoCadastrados(true);
    } else {
      this.carregarAssuntoCadastrados();
    }
    this.conteudos.map((c) => {
      if (ev == c.id) {
        if (!c.ativado) {
          c.ativado = "ativado";
        } else {
          c.ativado = null;
        }
      }
      return c;
    });
  }

  carregarAssuntoCadastrados(conteudo: boolean = false) {
    this.assuntoService.getAllAssunto().subscribe(
      (assunto: Assunto[]) => {
        this.assuntoCadastrados = assunto.map((assunto) => {
          const filter = this.conteudos.filter(
            (c) => c.id == assunto.id_conteudo
          )[0];
          const filterSubTotal = this.subAssuntos.filter(
            (c) => c.id_assunto == assunto.id
          );
          const filterSubTotalFeito = this.subAssuntos.filter(
            (c) => c.id_assunto == assunto.id && c.estudado
          );
          assunto.quantidadeSubAssunto = filterSubTotal.length;
          assunto.quantidadeSubAssuntoFeitos = filterSubTotalFeito.length;
          assunto.tituloConteudo = filter.titulo ? filter.titulo : "";
          return assunto;
        });

        if (conteudo) {
          this.assuntoCadastrados = this.assuntoCadastrados.filter((assunto) =>
            this.idsConteudos.includes(assunto.id_conteudo)
          );
        }
        this.dataSource = new MatTableDataSource<Assunto>(
          this.assuntoCadastrados
        );
      },
      (error: any) => {
        this.mostrarMensagem("Cep digitado de forma incorreta!", "danger");
      }
    );
  }

  carregarSubAssuntoCadastrados(alterado: boolean = false) {
    this.subAssuntoService.getAllSubAssunto().subscribe(
      (assuntos) => {
        this.subAssuntos = assuntos;

        if(!alterado){
          this.carregarAssuntoCadastrados();
        }
      },
      (error: any) => {
        this.mostrarMensagem("Cep digitado de forma incorreta!", "danger");
      }
    );
  }

  salvar() {
    // const formValue = this.configForm.value;
    // const assunto: Assunto = {
    //   codAssunto: 0,
    //   codSistema: 'H',
    //   sigAssunto: formValue.sigla as string,
    //   numCnpj: formValue.cnpj as string,
    //   desRazao: formValue.razao as string,
    //   desEndereco: formValue.endereco as string,
    // };
    // this.assuntoService.createAssunto(assunto).subscribe(
    //   () => {
    //     this.limpar();
    //     this.carregarAssuntoCadastrados()
    //     this.openStatusModal('Salvo com sucesso', 'S');
    //     this.pesquisar(true)
    //   },
    //   (error: any) => {
    //     this.openStatusModal('Erro ao salvar Instituição: ' + error.error, 'E', error.status);
    //   }
    // );
  }

  salvarOuEditar() {
    this.configurando = true;
    if (this.configForm.valid) {
      if (!this.salvando) {
        this.editar();
      } else {
        this.salvar();
      }
    } else {
      this.configForm.markAllAsTouched();
      this.configInvalido = true;
    }
    this.configurando = false;
  }

  habilitarEditar() {
    this.hablitarOuDesabilitarCampos(true);
    this.pesquisar(false);
    this.salvando = false;
  }

  hablitarOuDesabilitarCampos(ativo: boolean) {
    if (ativo) {
      Object.keys(this.configForm.controls).forEach((key) => {
        if (!(key === "codigo")) {
          this.configForm.get(key)?.enable();
        }
      });
    } else {
      Object.keys(this.configForm.controls).forEach((key) => {
        this.configForm.get(key)?.disable();
      });
    }
  }

  editar() {
    // const id = this.assunto.codAssunto;
    // const formValue = this.configForm.value;
    // this.salvando = true;
    // if (this.assunto.codSistema === "Hemote Plus") {
    //   this.assunto.codSistema = "H";
    // }
    // const assunto: Assunto = {
    //   codAssunto: id,
    //   codSistema: this.assunto.codSistema as string,
    //   sigAssunto: formValue.sigla as string,
    //   numCnpj: formValue.cnpj as string,
    //   desRazao: formValue.razao as string,
    //   desEndereco: formValue.endereco as string,
    // };
    // this.assuntoService.updateAssunto(id, assunto).subscribe(
    //   () => {
    //     this.limpar();
    //     this.carregarAssuntoCadastrados();
    //     this.openStatusModal('Editado com sucesso', 'S');
    //     this.pesquisar(true)
    //   },
    //   (error: any) => {
    //     this.openStatusModal('Erro ao editar instituiçãoo: ' + error.error, 'E', error.status);
    //   }
    // );
  }

  ordenar(nome: string) {
    //  this.dataSource.data.sort((a, b) => a.codAssunto - b.codAssunto);
    //  this.dataSource = new MatTableDataSource<Assunto>(this.dataSource.data);
  }

  deletar() {
    // const id = this.assunto.codAssunto;
    // this.assuntoService.deleteAssunto(id)
    //   .pipe(
    //     catchError(error => {
    //       if (error.status == 500) {
    //         this.openStatusModal('A exclusão não pode ser realizada, pois este dado está sendo usado em outros contextos', 'A', error.status);
    //       } else {
    //         this.openStatusModal('Erro ao exluir instituiçãoo: ' + error.error, 'E', error.status);
    //       }
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe(() => {
    //     this.fecharModalDeletar()
    //     this.pesquisar(true)
    //     this.limpar()
    //     this.carregarAssuntoCadastrados()
    //   });
  }

  abrirModalDeletar(): void {
    this.mensagemModal =
      "<h3><b>Tem certeza que deseja excluir esta instituição?</b></h3>";
    this.exclusaoConfirmada = true;
  }

  fecharModalDeletar(): void {
    this.exclusaoConfirmada = false;
  }

  reverter() {
    this.limpar();
    this.fecharModalReverter();
    this.pesquisar(true);
  }

  abrirModalReverter(): void {
    this.mensagemModal =
      "<h3><b>Tem certeza que deseja voltar a consulta?</b></h3> todos os dados preenchidos serão perdidos";
    this.reverterConfirmado = true;
  }

  fecharModalReverter(): void {
    this.reverterConfirmado = false;
  }

  incluir(pesquisa: boolean) {
    this.pesquisar(pesquisa);
    this.pesquisar(false);
    this.hablitarOuDesabilitarCampos(true);
    this.limpar();
  }

  limpar() {
    this.configInvalido = false;
    this.configForm.reset();
    this.configForm.controls["codigo"].setValue("");
    this.configForm.controls["codSistema"].setValue("");
    this.configForm.controls["endereco"].setValue("");
    this.configForm.controls["codSistema"].setValue("");
    this.configForm.controls["sigla"].setValue("");
    this.configForm.controls["razao"].setValue("");
    this.configForm.controls["cnpj"].setValue("");

    this.podeDeletar = false;
    this.podeEditar = false;
    this.podePesquisar = false;
    this.podeSalvar = true;
    this.podeIncluir = false;
  }

  pesquisar(pesquisa: boolean) {
    this.pesquisando = pesquisa;
    if (this.idsConteudos.length > 0) {
      this.carregarAssuntoCadastrados(true);
    } else {
      this.carregarAssuntoCadastrados();
    }
  }

  leitura(elemento: Assunto) {
    this.assunto = elemento;
    const subs = this.subAssuntos.filter(
      (sub) => sub.id_assunto == this.assunto.id
    );
    this.dataSourceSub = new MatTableDataSource<SubAssunto>(subs);
   
    this.pesquisar(false);
    if (this.idsConteudos.length > 0) {
      this.carregarAssuntoCadastrados(true);
    } else {
      this.carregarAssuntoCadastrados();
    }
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement)?.value
      .trim()
      .toLowerCase();
    if (filterValue !== undefined) {
      this.dataSource.filter = filterValue;
    }
  }

  applyFilterSub(event: any) {
    const filterValue = (event.target as HTMLInputElement)?.value
      .trim()
      .toLowerCase();
    if (filterValue !== undefined) {
      this.dataSourceSub.filter = filterValue;
    }
  }

  async mostrarMensagem(
    message: string,
    color: "success" | "warning" | "danger"
  ) {
    let panelClass = "";
    switch (color) {
      case "success":
        panelClass = "success-toast";
        break;
      case "warning":
        panelClass = "warning-toast";
        break;
      case "danger":
        panelClass = "danger-toast";
        break;
      default:
        panelClass = "";
        break;
    }

    await this.snackBar
      .open(message, "Fechar", {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: [panelClass],
      })
      .afterDismissed()
      .toPromise();
  }

  handleChange(checked: boolean) {
    const assunto: Assunto = {
      id: this.assunto.id,
      id_conteudo: this.assunto.id_conteudo,
      numeracao: this.assunto.numeracao,
      titulo: this.assunto.titulo,
      estudado: checked,
    };
    this.assuntoService.updateAssunto(assunto).subscribe((c) => {
      if (this.idsConteudos.length > 0) {
        this.carregarAssuntoCadastrados(true);
      } else {
        this.carregarAssuntoCadastrados();
      }
      this.pesquisar(false);
    });
    
  }

  mudarStatusSub(ev: any,checked: boolean) {
    const sub: SubAssunto = {
      id: ev.id,
      id_assunto: ev.id_assunto,
      numeracao: ev.numeracao,
      titulo: ev.titulo,
      estudado: checked,
    };
    this.subAssuntoService.updateSubAssunto(sub).subscribe(()=>{
      this.carregarSubAssuntoCadastrados(true)
    });
   
  }

}
