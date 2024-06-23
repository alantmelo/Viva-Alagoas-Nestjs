import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CitiesModule } from './cities/cities.module';
import { BeachesModule } from './beaches/beaches.module';
import { RestaurantTypesModule } from './restaurant-types/restaurant-types.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { AccommodationTypesModule } from './accommodation-types/accommodation-types.module';
import { RestaurantServiceTypeModule } from './restaurant-service-type/restaurant-service-type.module';
import { ServiceTypeModule } from './service-type/service-type.module';
import { AccommodationsModule } from './accommodations/accommodations.module';
import { ToursModule } from './tours/tours.module';
import { TourTypesModule } from './tour-types/tour-types.module';
import { TourPackagesModule } from './tour-packages/tour-packages.module';
import { StoreTypesModule } from './store-types/store-types.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CitiesModule,
    BeachesModule,
    RestaurantTypesModule,
    RestaurantsModule,
    AccommodationTypesModule,
    RestaurantServiceTypeModule,
    ServiceTypeModule,
    AccommodationsModule,
    ToursModule,
    TourTypesModule,
    TourPackagesModule,
    StoreTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
