import { DurationObjectUnits } from 'luxon';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DurationType implements DurationObjectUnits {
  @Field()
  years?: number | undefined;
  @Field()
  quarters?: number | undefined;
  @Field()
  months?: number | undefined;
  @Field()
  weeks?: number | undefined;
  @Field()
  days?: number | undefined;
  @Field()
  hours?: number | undefined;
  @Field()
  minutes?: number | undefined;
  @Field()
  seconds?: number | undefined;
  @Field()
  milliseconds?: number | undefined;
}
