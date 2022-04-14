import { Column, Entity, ManyToOne, RelationId } from 'typeorm'
import { CoreEntity } from '../../common/entities/core.entity'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { CategoryEntity } from './category.entity'
import { UserEntity } from '../../auth/entities/user.entity'

export class FoodIngredient {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Food ingredient subject',
    type: String,
    nullable: false,
    required: true,
  })
  subject: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Food ingredient amount',
    type: Number,
    nullable: false,
    required: true,
  })
  amount: number
}

@Entity({ name: 'Recipe' })
export class RecipeEntity extends CoreEntity {
  @Column({ name: 'TITLE', type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recipe title',
    type: String,
    nullable: false,
    required: true,
  })
  title: string

  @Column({ name: 'DESCRIPTION', type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recipe description',
    type: String,
    nullable: false,
    required: true,
  })
  description: string

  @Column({ name: 'FOOD_NAME', type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Recipe food name',
    type: String,
    nullable: false,
    required: true,
  })
  foodName: string

  @Column({ name: 'AMOUNT', type: Number, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Food amount',
    type: Number,
    nullable: false,
    required: true,
  })
  amount: number

  @Column({
    name: 'FOOD_INGREDIENTS',
    type: 'json',
    nullable: false,
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Food ingredients',
    nullable: false,
    required: true,
    type: [FoodIngredient],
  })
  foodIngredients: FoodIngredient[]

  @Column({ name: 'COOK_TIME', type: Number, nullable: false })
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Cook time',
    type: Number,
    nullable: false,
    required: true,
  })
  cookTime: number

  @Column({ name: 'COOK_IMAGES', type: 'json', nullable: false })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Cook images max count 10',
    nullable: false,
    required: true,
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
  })
  cookImages: string[]

  @ManyToOne(() => CategoryEntity, (category) => category.recipes, {
    eager: true,
  })
  category: CategoryEntity

  @ManyToOne(() => UserEntity, (owner) => owner.recipes, {
    onDelete: 'CASCADE',
  })
  owner: UserEntity
}