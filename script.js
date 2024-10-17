class FileManager {
  constructor() {
    this.txtInput = document.getElementById("txtInput");
    this.txtOutput = document.getElementById("txtOutput");
    this.originalFileBtn = document.getElementById("originalFile");
    this.modifiedFileBtn = document.getElementById("modifiedFile");

    this.addEventListeners();
  }

  addEventListeners() {
    this.txtInput.addEventListener("change", (event) =>
      this.handleFileUpload(event)
    );
    this.originalFileBtn.addEventListener("click", () =>
      this.downloadOriginalFile()
    );
    this.modifiedFileBtn.addEventListener("click", () =>
      this.downloadModifiedFile()
    );
  }

  /* Método para upload de arquivos txt */
  handleFileUpload(event) {
    const file = event.target.files[0];

    if (file.type === "text/plain") {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.txtOutput.value = e.target.result;
      };

      reader.readAsText(file);
    } else {
      alert("Please, select a .txt file");
    }
  }

  /* Método para download do arquivo original */
  downloadOriginalFile() {
    const file = this.txtInput.files[0];

    if (file) {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("There is no files to download");
    }
  }

  /* Método para download do arquivo modificado*/
  downloadModifiedFile() {
    const content = this.txtOutput.value;
    const file = this.txtInput.files[0];

    if (content) {
      const blob = new Blob([content], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `modified_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Nenhum conteúdo modificado para baixar");
    }
  }
}

/* Inicialização/instância do objeto para renderizar a página */
document.addEventListener("DOMContentLoaded", () => {
  new FileManager();
});
