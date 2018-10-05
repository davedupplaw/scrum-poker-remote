import { ScrumModule } from './scrum.module';

describe('ScrumModule', () => {
  let scrumModule: ScrumModule;

  beforeEach(() => {
    scrumModule = new ScrumModule();
  });

  it('should create an instance', () => {
    expect(scrumModule).toBeTruthy();
  });
});
