/// <reference types="cypress" />

import { title } from 'process'
import RegisterForm from '../support/pageObjects/RegisterForm'
import assert from 'assert'


const registerForm = new RegisterForm()
const colors = {
  error: 'rgb(220, 53, 69)',
  success: 'rgb(220, 53, 69)'
}

describe('Image Registration', () => {
  after(() => {
    cy.clearAllLocalStorage();
  });
  // describe.skip('Submitting an image with invalid inputs', () => {
  //   after(() => {
  //     cy.clearAllLocalStorage()
  //   })

  //   const input = {
  //     title: '',
  //     url:''
  //   }
    
  //   it('Given I am on the image registration page', () => {
  //     cy.visit('/')
  //   }) 
  //   it (`When I enter "${input.title}" in the title field`, () => {
  //     registerForm.typeTitle(input.title)
  //   })
  //   it (`When I enter "${input.url}" in the URL field`, () => {
  //     registerForm.typeUrl(input.url)
  //   })
  //   it (`Then I click the submit button`, () => {
  //     registerForm.clickSubmit()
  //   })
  //   it (`Then I should see "Please type a title for the image" message above the title field`, () => {
  //     registerForm.elements.titleFeedback().should('contains.text', 'Please type a title for the image.')
  //     // registerForm.elements.titleFeedback().should(element => {
  //     //   debugger
  //     // })
  //   }) 
  //   it (`And I should see "Please type a valid URL" message above the imageUrl field`, () => {
  //     registerForm.elements.imageURLFeedback().should('contains.text', 'Please type a valid URL')
  //   })
  //   it (`And I should see an exclamation icon in the title and URL fields`, () => {
  //     registerForm.elements.titleFeedback().should(([element]) => {
  //       const styles = window.getComputedStyle(element)
  //       const border = styles.getPropertyValue('border-right-color')
  //       //debugger
  //       assert.strictEqual(border, colors.error)
  //     })
  //   })
  // })

  // // >>> REFATORANDO TESTE ACIMA
  describe('Given i am on the image registration page', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    context('When I submit with invalid inputs', () => {
      beforeEach(() => {
        registerForm.typeTitle('')
        registerForm.typeUrl('')
        registerForm.clickSubmit()
      });
    });

    it('Then I should see validation messages', () => {
      registerForm.elements.titleFeedback().should('contain.text', 'Please type a title for the image.')
      registerForm.elements.imageURLFeedback().should('contain.text', 'Please type a valid URL')
    })

    it('And I should see error icons (red border)', () => {
      registerForm.elements.titleFeedback().should(([el]) => {
        const styles = window.getComputedStyle(el)
        const border = styles.getPropertyValue('border-right-color')
        assert.strictEqual(border, colors.error)
      })
    })
  });

  describe('Submitting an image with valid inputs using enter key', () => {
    after(() => {
      cy.clearAllLocalStorage()
    })

    const input = {
      title: 'Alien BR',
      url: 'https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg'
    }

    it('Given I am on the image registration page', () => {
      cy.visit('/')
    });

    it(`When I enter "${input.title}" in the title field`, () => {
      registerForm.clickSubmit()
      registerForm.typeTitle(input.title)
    })
     
    it(`When I enter "${input.url}" in the URL field`, () => {
      registerForm.typeUrl(input.url)
    })
    it('Then I should see a check icon in the title field', () => {
      registerForm.elements.titleFeedback().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('color')
        //debugger
        assert.strictEqual(border, colors.success)
      })
    })
    it('Then I should see a check icon in the imageUrl field', () => {
      registerForm.elements.imageURLFeedback().should(([element]) => {
        const styles = window.getComputedStyle(element)
        const border = styles.getPropertyValue('color')
        //debugger
        assert.strictEqual(border, colors.success)
      })
    })
    it('Then I can hit enter to submit the form', () => {
      registerForm.clickSubmit()
    })
    it('And the list of registered images should be updated with the new item', () => {
      cy.get('#card-list .card-img').should((elements) => {
        const lastElement = elements[elements.length - 1]
        const src = lastElement.getAttribute('src')
        assert.strictEqual(src, input.url)
      })

    })
    it('And the new item should be stored in the localStorage', () => {
      cy.getAllLocalStorage().should((ls) => {
        const currentLs = ls[window.location.origin]
        const elements = JSON.parse(Object.values(currentLs))
        const lastElement = elements[elements.length - 1]

        assert.deepStrictEqual(lastElement, {
          title: input.title,
          imageUrl: input.url,
        })
      })
    })

    it('Then The inputs should be cleared', () => {
      registerForm.elements.titleInput().should('have.value', '')
      registerForm.elements.imageURLInput().should('have.value', '')
    })

  });

  describe.only('Submitting an image and updating the list', () => {
    before(() => {
      cy.visit('/')
    })

    // after(() => {
    //   cy.log('AFTER rodando...');
    //   cy.clearAllLocalStorage()
    // })

    const input = {
      title: 'ET Bilu',
      url: 'https://pbs.twimg.com/profile_images/1169525097/etebilu_400x400.jpg'
    }
  
    // it('Given I am on the image registration page', () => {
    //   cy.visit('/')
    // });

    it('Then I have entered valid inputs', () => {
      cy.submitNewImagem(input)
    }); 
    
    it('And the list of registered images should be updated with the new item', () => {
      cy.get('#card-list .card-img').should((elements) => {
        const lastElement = elements[elements.length - 1]
        const src = lastElement.getAttribute('src')
        expect(src).to.be.equal(input.url)
      })
    }); 
    it('And the new item should be stored in the localStorage', () => {
      cy.getAllLocalStorage().should((ls) => {
        const appStorage = ls[window.location.origin]
       
        expect(appStorage).to.have.property('tdd-ew-db');
        const data = JSON.parse(appStorage['tdd-ew-db']);
        
        expect(data).to.deep.include({
          title: input.title,
          imageUrl: input.url
        })
      })
    }); 
    it('Then The inputs should be cleared', () => {
      registerForm.elements.titleInput().should('have.value', '')
      registerForm.elements.imageURLInput().should('have.value', '')
    });
  });
})