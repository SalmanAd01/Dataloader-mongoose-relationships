import {ObjectType,Field} from 'type-graphql'

@ObjectType({description: "Name Url type"})
class nameurlType {
    @Field(type => String, { nullable: false })
    name: string;
    @Field(type => String, { nullable: false })
    url: string;
}

export default nameurlType;
