export default class RegisterForm {
    elements = {
      titleInput: () => cy.get('#title'),
      titleFeedback: () => cy.get('#titleFeedback'),
      imageURLInput: () => cy.get('#imageUrl'),
      imageURLFeedback: () => cy.get('#urlFeedback'),
      submitBtn: () => cy.get('#btnSubmit')
    }
  
    typeTitle(text) {
      if(!text) return;
      this.elements.titleInput().type(text)
    }
  
    typeUrl(text) {
      if(!text) return;
      this.elements.imageURLInput().type(text)
    }
  
    clickSubmit() {
      this.elements.submitBtn().click()
    }

    submitForm({title, url}) {
      this.typeTitle(title)
      this.typeUrl(url)
      this.clickSubmit()
    }
  
  } 