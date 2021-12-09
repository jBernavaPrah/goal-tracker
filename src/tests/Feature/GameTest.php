<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Team;
use Carbon\Carbon;
use Tests\TestCase;

class GameTest extends TestCase
{

    public function test_delete(){
        $game = Game::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!) {
        deleteGame(id:$id){
            id
        }
        }
        ', [
            'id' => $game->id
        ])->assertJson([
            'data' => [
                'deleteGame' => [
                    'id' => $game->id
                ]
            ]
        ]);

        $this->assertModelMissing($game);

    }

    public function test_update()
    {

        $game = Game::factory()->create();

        $team1 = Team::factory()->create();
        $team2 = Team::factory()->create();


        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!, $team1:ID! $team2:ID!) {
        updateGame(input: {id: $id team1: $team1 team2: $team2 }){
            id, team1 { id } team2 { id }
        }
        }
        ', [
            'id' => $game->id,
            'team1' => $team1->id,
            'team2' => $team2->id
        ])->assertJson([
            'data' => [
                'updateGame' => [
                    'team1' => [
                        'id' => $team1->id
                    ],
                    'team2' => [
                        'id' => $team2->id
                    ]
                ]
            ]
        ]);


    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_creation()
    {

        $team1 = Team::factory()->create();
        $team2 = Team::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($team1:ID! $team2:ID! $playedAt: DateTime!) {
        createGame(input: {team1: $team1 team2: $team2 playedAt: $playedAt }){
            id, team1 { id } team2 { id }
        }
        }
        ', [
            'team1' => $team1->id,
            'team2' => $team2->id,
            'playedAt' => Carbon::now()->toISOString()
        ])->assertJson([
            'data' => [
                'createGame' => [
                    'team1' => [
                        'id' => $team1->id
                    ],
                    'team2' => [
                        'id' => $team2->id
                    ]
                ]
            ]
        ]);

    }
}
