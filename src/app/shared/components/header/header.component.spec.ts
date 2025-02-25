import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HeaderComponent ]  
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o HeaderComponent', () => {
    expect(component).toBeTruthy(); 
  });

  it('deve exibir o título "Teste de Desenvolvedor Front-End - Anota AI"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('.content-header__title-subtitle__title');
    expect(titleElement.textContent).toContain('Teste de Desenvolvedor Fron-End - Anota AI');
  });

  it('deve exibir o nome "Vinicius Lopes de Camargo"', () => {
    const compiled = fixture.nativeElement;
    const subtitleElement = compiled.querySelector('.content-header__title-subtitle__subtitle');
    expect(subtitleElement.textContent).toContain('Vinicius Lopes de Camargo');
  });

  it('deve exibir a imagem com o logo correto', () => {
    const compiled = fixture.nativeElement;
    const imgElement: HTMLImageElement = compiled.querySelector('img.content-header__logo');
    expect(imgElement.src).toBe('https://githubanotaai.github.io/frontend-interview-mock-data/assets/128x128.png');
    expect(imgElement.alt).toBe('logo anota ai');
  });
});