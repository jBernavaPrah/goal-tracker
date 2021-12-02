<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Player;
use App\Models\Team;
use Tests\TestCase;

class TeamTest extends TestCase
{

    public function test_delete()
    {
        $team = Team::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!) {
        deleteTeam(id:$id){
            id
        }
        }
        ', [
            'id' => $team->id
        ])->assertJson([
            'data' => [
                'deleteTeam' => [
                    'id' => $team->id
                ]
            ]
        ]);

        $this->assertModelMissing($team);

    }

    public function test_update()
    {

        $team = Team::factory()->state(['name' => 'aaa'])->create();

        $newName = $this->faker->name;

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID! $name: String!) {
        updateTeam(input: {id: $id name: $name}){
            id, name
        }
        }
        ', [
            'id' => $team->id,
            'name' => $newName
        ])->assertJson([
            'data' => [
                'updateTeam' => [
                    'name' => $newName,

                ]
            ]
        ]);


    }

    /**
     *
     * @return void
     */
    public function test_creation()
    {


        $this->graphQL(/** @lang GraphQL */ '
        mutation ($name: String!) {
        createTeam(input: {name: $name }){
            id name
        }
        }
        ', [
            'name' => 'abc'
        ])->assertJson([
            'data' => [
                'createTeam' => [
                    'name' => 'abc'
                ]
            ]
        ]);

    }
}
