import { TestBed } from '@angular/core/testing';

import { TodoApiCallService } from './todo-api-call.service';

describe('TodoApiCallService', () => {
  let service: TodoApiCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoApiCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
