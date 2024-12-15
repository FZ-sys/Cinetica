// src/app/useCases/GetTVShowUseCase.ts
import { TVShowRepository } from '@/repository/interface/TVShowRepository'; 
import { TVShowDetails } from '@/entities/TVShowsDetails';
export class GetTVShowUseCase {
  private tvShowRepository: TVShowRepository;

  constructor(tvShowRepository: TVShowRepository) {
    this.tvShowRepository = tvShowRepository;
  }


  async execute(id: string): Promise<TVShowDetails> {
    const tvShowDetails = await this.tvShowRepository.getTVShowById(id);
    return tvShowDetails;
  }
}
