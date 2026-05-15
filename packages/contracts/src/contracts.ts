import { oc } from "@orpc/contract"
import { farmerContract } from "./modules/farmer/farmer.contract.js"
import { landparcelContract } from "./modules/landparcel/landparcel.contract.js"
import { cropContract } from "./modules/crop/crop.contract.js"
import { livestockContract } from "./modules/livestock/livestock.contract.js"
import { programContract } from "./modules/program/program.contract.js"

export const contract = oc.router({
  farmer: farmerContract,
  landparcel: landparcelContract,
  crop: cropContract,
  livestock: livestockContract,
  program: programContract,
})