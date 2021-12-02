<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Player;
use App\Models\Team;
use Tests\TestCase;

class PlayerTest extends TestCase
{

    public function test_delete()
    {
        $player = Player::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!) {
        deletePlayer(id:$id){
            id
        }
        }
        ', [
            'id' => $player->id
        ])->assertJson([
            'data' => [
                'deletePlayer' => [
                    'id' => $player->id
                ]
            ]
        ]);

        $this->assertModelMissing($player);

    }

    public function test_update()
    {

        $player = Player::factory()->state([
            'name' => 'aaa'
        ])->for(Team::factory())->create();

        $team = Team::factory()->create();

        $newName = $this->faker->name;

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!, $team:ID! $name: String!) {
        updatePlayer(input: {id: $id name: $name, team: $team}){
            id, team { id } name
        }
        }
        ', [
            'id' => $player->id,
            'name' => $newName,
            'team' => $team->id
        ])->assertJson([
            'data' => [
                'updatePlayer' => [
                    'name' => $newName,
                    'team' => [
                        'id' => $team->id
                    ]
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

        $team = Team::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($team:ID! $name: String!) {
        createPlayer(input: {team: $team name: $name }){
            id, team { id } name
        }
        }
        ', [
            'team' => $team->id,
            'name' => 'abc'
        ])->assertJson([
            'data' => [
                'createPlayer' => [
                    'team' => [
                        'id' => $team->id
                    ],
                    'name' => 'abc'
                ]
            ]
        ]);

    }
}
