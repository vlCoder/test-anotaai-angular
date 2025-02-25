import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { mockProducts } from '../mockProducts/products.mock'; 


describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ProductsService ]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as requisições foram feitas corretamente
  });

  it('should load products on service initialization', () => {
    // Espera uma única requisição GET
    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    // Verifica se o BehaviorSubject foi atualizado com os produtos mock
    service.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  });

  it('should handle error when loading products', () => {
    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    // Simula um erro na requisição
    req.flush('Erro', { status: 500, statusText: 'Server Error' });

    service.products$.subscribe(products => {
      // Em caso de erro, o catchError retorna um observable com array vazio
      expect(products).toEqual([]);
    });
  });

  it('should search products based on search term', () => {
    const req = httpMock.expectOne(`${service.baseUrl}`);
    req.flush(mockProducts);

    service.searchProducts('Fatia').subscribe(results => {
      expect(results.length).toBe(1);
      expect(results[0].id).toBe(1);
    });
  });

  it('should return all products using getAll()', () => {
    // Primeiro, descarregamos a requisição que foi disparada no construtor (loadProducts)
    const initReq = httpMock.expectOne(`${service.baseUrl}`);
    expect(initReq.request.method).toBe('GET');
    initReq.flush(mockProducts);
  
    // Agora chamamos o método getAll(), que dispara outra requisição GET
    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });
  
    // Espera-se que agora haja apenas uma requisição pendente, que é a do getAll()
    const req = httpMock.expectOne(`${service.baseUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should delete a product by id', () => {
    const req = httpMock.expectOne(`${service.baseUrl}`);
    req.flush(mockProducts);

    service.deleteProduct(1);

    service.products$.subscribe(products => {
      expect(products.find(product => product.id === 1)).toBeUndefined();
    });
  });
});