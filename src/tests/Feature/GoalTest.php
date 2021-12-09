<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\Goal;
use App\Models\Player;
use App\Models\Team;
use Tests\TestCase;

class GoalTest extends TestCase
{

    public function test_delete()
    {
        $goal = Goal::factory()->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($id:ID!) {
        deleteGoal(id:$id){id}
        }
        ', [
            'id' => $goal->id
        ])->assertJson([
            'data' => [
                'deleteGoal' => [
                    'id' => $goal->id
                ]
            ]
        ]);

        $this->assertModelMissing($goal);

    }


    /**
     *
     * @return void
     */
    public function test_creation()
    {

        $player = Player::factory()->create();
        $game = Game::factory([
            'team1_id' => $player->team->id
        ])->create();

        $this->graphQL(/** @lang GraphQL */ '
        mutation ($player:ID! $game: ID! ) {
        createGoal(input: {player: $player game: $game}){
            id, player {id}
        }
        }
        ', [
            'player' => $player->id,
            'game' => $game->id
        ])->assertJson([
            'data' => [
                'createGoal' => [
                    'player' => [
                        'id' => $player->id
                    ]
                ]
            ]
        ]);

    }
}
