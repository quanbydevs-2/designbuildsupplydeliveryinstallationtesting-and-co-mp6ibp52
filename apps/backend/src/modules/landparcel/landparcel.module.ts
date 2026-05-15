import { Module } from "@nestjs/common"
import { LandParcelController } from "./landparcel.controller"
import { LandParcelService } from "./landparcel.service"

@Module({
  controllers: [LandParcelController],
  providers: [LandParcelService],
})
export class LandParcelModule {}