import { TVShow } from '@/entities/TVShow'; 
import { TVShowRepository } from '@/repository/interface/TVShowRepository'; 

export class GetAllTVShowsUseCase {
  private tvShowRepository: TVShowRepository;

  constructor(tvShowRepository: TVShowRepository) {
    this.tvShowRepository = tvShowRepository;
  }

  async execute(): Promise<TVShow[]> {
    return this.tvShowRepository.getPopularTVShows(); 
  }
}
